import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';

function Home({ onSelect }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      {articles.map((article) => (
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
