require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const scraperService = require('../services/scraper.service');

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || 'http://localhost:5000';

const searchGoogle = async (query) => {
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;

    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const links = [];

    $('a').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href && href.startsWith('/url?q=')) {
        const url = href.split('/url?q=')[1].split('&')[0];
        const decodedUrl = decodeURIComponent(url);

        if (
          decodedUrl.startsWith('http') &&
          !decodedUrl.includes('google.com') &&
          !decodedUrl.includes('youtube.com') &&
          (decodedUrl.includes('blog') ||
            decodedUrl.includes('article'))
        ) {
          links.push(decodedUrl);
        }
      }
    });

    return links.slice(0, 2);
  } catch (error) {
    console.error('Error searching Google:', error.message);
    return [];
  }
};

const fetchArticles = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_API_URL}/api/articles`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    return [];
  }
};

const regenerateArticles = async () => {
  console.log('Starting article regeneration process...');
  const articles = await fetchArticles();

  for (const article of articles) {
    console.log(`Searching references for: ${article.title}`);
    const references = await searchGoogle(article.title);
    console.log(`Found ${references.length} references`);
  }
};

regenerateArticles();
