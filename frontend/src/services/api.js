const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchArticles = async () => {
  const res = await fetch(`${API_BASE_URL}/articles`);
  return res.json();
};

export const fetchArticleById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`);
  return res.json();
};
