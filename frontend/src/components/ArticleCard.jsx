function ArticleCard({ article, onSelect }) {
  return (
    <div
      className="article-card"
      onClick={() => onSelect(article._id)}
    >
      <h3>{article.title}</h3>
      <p>{article.content.slice(0, 120)}...</p>
    </div>
  );
}

export default ArticleCard;
