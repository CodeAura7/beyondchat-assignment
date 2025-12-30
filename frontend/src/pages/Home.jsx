import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';

function Home({ onSelect }) {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    if (filter === 'updated') return article.isUpdated === true;
    if (filter === 'original') return article.isUpdated === false;
    return true;
  });

  return (
    <div>
      <h2>Articles</h2>

      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          className={filter === 'original' ? 'active' : ''}
          onClick={() => setFilter('original')}
        >
          Original
        </button>

        <button
          className={filter === 'updated' ? 'active' : ''}
          onClick={() => setFilter('updated')}
        >
          Updated
        </button>
      </div>

      {filteredArticles.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default Home;
