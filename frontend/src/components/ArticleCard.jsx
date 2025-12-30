export default function ArticleCard({ article, onRegenerate }) {
  const isUpdated = article.isUpdated === true;

  return (
    <div className={`article-card ${isUpdated ? 'updated' : 'original'}`}>
      <span className={`status-badge ${isUpdated ? 'updated' : 'original'}`}>
        {isUpdated ? 'Updated' : 'Original'}
      </span>

      <h3>{article.title}</h3>
      <p>{article.content}</p>

      {!isUpdated && (
        <button onClick={() => onRegenerate(article._id)}>
          Regenerate
        </button>
      )}

      {isUpdated && article.references && article.references.length > 0 && (
        <div className="references">
          <h4>References</h4>
          <ul>
            {article.references.map((ref, index) => (
              <li key={index}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
