import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL; 

export const useNews = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news`);

        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching the news.');
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { articles, loading, error };
};
