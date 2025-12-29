require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const scraperService = require('../services/scraper.service');
const llmService = require('../services/llm.service');

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || 'http://localhost:5000';

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

    $('a').each((i, el) => {
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

const fetchArticles = async () => {
  const res = await axios.get(`${BACKEND_API_URL}/api/articles`);
  return res.data;
};

const regenerateArticles = async () => {
  const articles = await fetchArticles();

  for (const article of articles) {
    const refs = await searchGoogle(article.title);
    const referenceContents = [];

    for (const url of refs) {
      const { content } =
        await scraperService.scrapeArticleContent(url);
      if (content) {
        referenceContents.push(content.substring(0, 1500));
      }
    }

    if (referenceContents.length === 0) continue;

    console.log(`Rewriting: ${article.title}`);
    const rewritten =
      await llmService.rewriteArticle(
        article.title,
        article.content,
        referenceContents
      );

    console.log('Rewrite completed (not saved yet)');
  }
};

regenerateArticles();
