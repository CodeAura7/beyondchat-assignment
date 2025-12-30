const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://beyondchat-assignment-sy5h.onrender.com/api";

export const fetchArticles = async () => {
  const res = await fetch(`${API_BASE_URL}/articles`);
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return res.json();
};

export const fetchArticleById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  return res.json();
};
