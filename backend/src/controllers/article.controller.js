const Article = require('../models/article.model');
const scraperService = require('../services/scraper.service');

/* ---------- CRUD CONTROLLERS ---------- */

const createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      ...req.body,
      isUpdated: req.body.isUpdated ?? false,
      references: req.body.references ?? [],
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------- SCRAPE CONTROLLER ---------- */

const scrapeArticles = async (req, res) => {
  try {
    const scraped = await scraperService.scrapeOldestArticles();
    const savedArticles = [];

    for (const item of scraped) {
      const exists = await Article.findOne({ sourceUrl: item.url });
      if (exists) continue;

      const article = await Article.create({
        title: item.title,
        content: 'Original article content (pending rewrite)',
        slug: item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
        sourceUrl: item.url,

        // STEP 3: explicit state
        isUpdated: false,
        references: [],
      });

      savedArticles.push(article);
    }

    res.status(201).json(savedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ---------- EXPORTS ---------- */

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  scrapeArticles,
};
