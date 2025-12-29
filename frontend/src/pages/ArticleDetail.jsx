import { useEffect, useState } from 'react';
import { fetchArticleById } from '../services/api';

function ArticleDetail({ articleId, onBack }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(articleId).then(setArticle);
  }, [articleId]);

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}

export default ArticleDetail;
