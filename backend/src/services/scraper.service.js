const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://beyondchats.com/blogs';

const getLastPageNumber = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const $ = cheerio.load(response.data);

    let lastPage = 1;
    $('a.page-link, .pagination a').each((i, elem) => {
      const text = $(elem).text().trim();
      const pageNum = parseInt(text);
      if (!isNaN(pageNum) && pageNum > lastPage) {
        lastPage = pageNum;
      }
    });

    return lastPage;
  } catch (error) {
    console.error('Error getting last page:', error.message);
    return 1;
  }
};

const scrapeArticlesFromPage = async (pageUrl) => {
  try {
    const response = await axios.get(pageUrl);
    const $ = cheerio.load(response.data);

    const articles = [];
    $('.blog-card, article, .post').each((i, elem) => {
      const $elem = $(elem);
      const title = $elem
        .find('h2, h3, .title, .blog-title')
        .first()
        .text()
        .trim();

      const link = $elem.find('a').first().attr('href');

      if (title && link) {
        const fullUrl = link.startsWith('http')
          ? link
          : `https://beyondchats.com${link}`;

        articles.push({ title, url: fullUrl });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping page:', error.message);
    return [];
  }
};

const scrapeArticleContent = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('script, style, nav, header, footer, aside').remove();

    const title =
      $('h1').first().text().trim() ||
      $('title').text().trim();

    let content = '';
    $('article, .content, .post-content, main').each((i, elem) => {
      content += $(elem).text().trim() + '\n';
    });

    if (!content) {
      content = $('body').text().trim();
    }

    content = content.replace(/\s+/g, ' ').trim();

    return { title, content };
  } catch (error) {
    console.error('Error scraping article content:', error.message);
    return { title: '', content: '' };
  }
};

const scrapeOldestArticles = async () => {
  try {
    const lastPage = await getLastPageNumber();
    const lastPageUrl = `${BASE_URL}/page/${lastPage}`;
    const articlesData = await scrapeArticlesFromPage(lastPageUrl);

    return articlesData.slice(0, 5);
  } catch (error) {
    console.error('Error in scrapeOldestArticles:', error.message);
    throw error;
  }
};

module.exports = {
  scrapeOldestArticles,
  scrapeArticleContent,
};
