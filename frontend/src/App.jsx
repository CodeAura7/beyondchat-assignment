import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  const [selectedArticleId, setSelectedArticleId] =
    useState(null);

  return (
    <>
      <Navbar />
      <main className="container">
        {selectedArticleId ? (
          <ArticleDetail
            articleId={selectedArticleId}
            onBack={() => setSelectedArticleId(null)}
          />
        ) : (
          <Home onSelect={setSelectedArticleId} />
        )}
      </main>
    </>
  );
}

export default App;
