const articleService = require('../services/article.service');

const createArticle = async (req, res) => {
  try {
    const article = await articleService.createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
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
    const article = await articleService.updateArticle(
      req.params.id,
      req.body
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
    const article = await articleService.deleteArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
