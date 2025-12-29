const Article = require('../models/article.model');

const createArticle = async (articleData) => {
  const article = new Article(articleData);
  return await article.save();
};

const getAllArticles = async () => {
  return await Article.find().sort({ createdAt: -1 });
};

const getArticleById = async (id) => {
  return await Article.findById(id);
};

const updateArticle = async (id, updateData) => {
  return await Article.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteArticle = async (id) => {
  return await Article.findByIdAndDelete(id);
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
