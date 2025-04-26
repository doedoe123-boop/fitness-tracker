import React from 'react';
import { useNews } from '../hooks/useNews';

const HealthNews: React.FC = () => {
  const { articles, loading } = useNews();

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-dark-primary text-slate-800 dark:text-white pt-24">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">📰 Health & Fitness News</h1>
        <p className="text-lg mb-6">Stay informed with the latest updates in health, wellness, nutrition, and fitness</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-sm">🏃 Fitness Tips</span>
          <span className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full text-sm">🥗 Nutrition</span>
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full text-sm">🧘 Mental Wellness</span>
          <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-full text-sm">💪 Exercise Science</span>
        </div>
      </div>
      
      {loading ? (
        <p className="text-center">Loading news...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 px-6 py-12">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-dark-secondary shadow-lg rounded-xl overflow-hidden transition hover:scale-[1.02]"
            >
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-sm mt-2 line-clamp-3">{article.description}</p>
                <span className="text-xs text-gray-500 mt-3 block">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthNews;
