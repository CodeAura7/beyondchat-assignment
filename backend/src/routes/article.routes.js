const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

// static routes FIRST
router.post('/scrape', articleController.scrapeArticles);

// collection routes
router.post('/', articleController.createArticle);
router.get('/', articleController.getAllArticles);

// dynamic routes LAST
router.get('/:id', articleController.getArticleById);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

// regenerate article
router.post('/:id/regenerate', articleController.regenerateArticle);

module.exports = router;
