const Article = require('../models/article.model');
const scraperService = require('../services/scraper.service');

const scrapeArticles = async (req, res) => {
  try {
    const scraped = await scraperService.scrapeOldestArticles();

    const savedArticles = [];

    for (const item of scraped) {
      const exists = await Article.findOne({
        sourceUrl: item.url,
      });

      if (exists) continue;

      const article = await Article.create({
        title: item.title,
        content: 'Original article content (pending rewrite)',
        slug: item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        sourceUrl: item.url,
      });

      savedArticles.push(article);
    }

    res.status(201).json(savedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
