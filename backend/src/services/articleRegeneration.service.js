const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../models/article.model');
const scraperService = require('./scraper.service');
const llmService = require('./llm.service');

const searchGoogle = async (query) => {
  try {
    const response = await axios.get(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      }
    );

    const $ = cheerio.load(response.data);
    const links = [];

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('/url?q=')) {
        const url = decodeURIComponent(
          href.split('/url?q=')[1].split('&')[0]
        );
        if (
          url.startsWith('http') &&
          !url.includes('google.com') &&
          !url.includes('youtube.com')
        ) {
          links.push(url);
        }
      }
    });

    return links.slice(0, 2);
  } catch {
    return [];
  }
};

const regenerateArticleById = async (articleId) => {
  const article = await Article.findById(articleId);
  if (!article) {
    throw new Error('Article not found');
  }

  const refs = await searchGoogle(article.title);
  if (refs.length === 0) {
    throw new Error('No references found');
  }

  const referenceContents = [];

  for (const url of refs) {
    const { content } =
      await scraperService.scrapeArticleContent(url);
    if (content) {
      referenceContents.push(content.substring(0, 1500));
    }
  }

  if (referenceContents.length === 0) {
    throw new Error('No usable reference content');
  }

  const rewritten = await llmService.rewriteArticle(
    article.title,
    article.content,
    referenceContents
  );

  article.content = rewritten;
  article.isUpdated = true;
  article.references = refs;

  await article.save();
  return article;
};

module.exports = {
  regenerateArticleById,
};
