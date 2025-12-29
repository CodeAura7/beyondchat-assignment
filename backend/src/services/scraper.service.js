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
      const title = $(elem).find('h2, h3').first().text().trim();
      const link = $(elem).find('a').first().attr('href');

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

    const title = $('h1').first().text().trim();
    let content = '';

    $('article, main').each((i, elem) => {
      content += $(elem).text().trim() + '\n';
    });

    content = content.replace(/\s+/g, ' ').trim();

    return { title, content };
  } catch (error) {
    console.error('Error scraping article:', error.message);
    return { title: '', content: '' };
  }
};

const scrapeOldestArticles = async () => {
  const lastPage = await getLastPageNumber();
  const pageUrl = `${BASE_URL}/page/${lastPage}`;
  const articles = await scrapeArticlesFromPage(pageUrl);

  return articles.slice(0, 5).map(({ title, url }) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      title,
      slug,
      sourceUrl: url,
    };
  });
};

module.exports = {
  scrapeOldestArticles,
  scrapeArticleContent,
};
