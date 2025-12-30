const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is missing at build time");
}

export const fetchArticles = async () => {
  const res = await fetch(`${API_BASE_URL}/articles`);

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  return res.json();
};

export const fetchArticleById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.status}`);
  }

  return res.json();
};

export const regenerateArticle = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/articles/${id}/regenerate`,
    {
      method: 'POST',
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to regenerate article: ${res.status}`);
  }

  return res.json();
};
