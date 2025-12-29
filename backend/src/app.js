const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/article.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/articles', articleRoutes);

module.exports = app;
