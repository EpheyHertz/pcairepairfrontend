'use client';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProtectedRoute from '../components/ProtectedRoute';
import { throttle } from 'lodash';
import Cookies from 'js-cookie';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [articlesRendering, setArticlesRendering] = useState(false);

  // Memoize fetchNews function using useCallback
  const fetchNews = useCallback(async (page) => {
    const token = Cookies.get('accessToken');
    setLoadingMore(true);
    setArticlesRendering(true);
    try {
      const res = await axios.get(`https://pcrepair.vercel.app/apis/tech-news/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const newArticles = res.data.articles || [];
      const hasNext = res.data.has_next;

      // Filter out articles with removed content
      const filteredArticles = newArticles.filter((article) => {
        return !isArticleRemoved(article);
      });

      if (filteredArticles.length === 0) {
        setHasMoreNews(false); // Stop fetching if no more valid articles
      } else {
        // Use callback to update 'news' with the new articles
        setNews((prevNews) => [...prevNews, ...filteredArticles]);
        setArticleCount((prevCount) => prevCount + filteredArticles.length);
      }
      setHasMoreNews(hasNext);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setArticlesRendering(false);
    }
  }, []);

  // Check if an article is marked as removed
  const isArticleRemoved = (article) => {
    const removedKeywords = ['[Removed]', null];
    return (
      removedKeywords.includes(article.title) ||
      removedKeywords.includes(article.description) ||
      removedKeywords.includes(article.urlToImage) ||
      removedKeywords.includes(article.author)
    );
  };

  // Effect runs when 'page' changes to load more news
  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = throttle(() => {
      // Check if the user is near the bottom of the page
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 &&
        !loadingMore &&
        hasMoreNews &&
        !articlesRendering
      ) {
        if (articleCount >= 45) {
          console.log('Reached 45 articles, incrementing page.');
          // Increment page only if there's more news
          if (hasMoreNews) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      }
    }, 500); // Throttle the scroll event

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMoreNews, articleCount, articlesRendering]);

  // Helper function to format date in the user's local timezone
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format article tags/keywords into a nice display
  const formatKeywords = (keywords) => {
    if (!keywords) return null;
    
    // Handle if keywords is already an array
    if (Array.isArray(keywords)) {
      return keywords.map((keyword, idx) => (
        <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
          {keyword}
        </span>
      ));
    }
    
    // Handle if keywords is a string (comma separated)
    if (typeof keywords === 'string') {
      return keywords.split(',').map((keyword, idx) => (
        <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
          {keyword.trim()}
        </span>
      ));
    }
    
    return null;
  };

  if (loading && !loadingMore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 font-medium">Loading news, please wait...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
              Latest Tech News
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Stay updated with the latest technology trends, innovations, and industry insights
            </p>
          </header>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article, index) => (
                <article 
                  key={index} 
                  className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={article.image_url || article.urlToImage || '/images/technews.jpg'}
                      alt={article.title || 'News article'}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <h2 className="text-xl font-bold leading-tight mb-3 line-clamp-3 text-white">
                      {article.title || 'Title not available'}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {article.snippet || article.description || 'Description not available'}
                    </p>
                    
                    <div className="mb-4 flex flex-wrap">
                      {formatKeywords(article.keywords)}
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <div className="flex items-center text-xs text-gray-300 mb-4">
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <span className="font-medium">{article.author || article.source__name || article.source || 'Unknown'}</span>
                      
                      <span className="mx-2">•</span>
                      
                      <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8m-2 0a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2h9z" />
                        </svg>
                      </span>
                      <span>{article.source__name || article.source || 'Unknown'}</span>
                    </div>
                    
                    <div className="text-xs text-gray-300 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(article.published_at || article.publishedAt)}
                    </div>
                    
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium py-2 px-4 rounded-lg w-full text-center transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg"
                    >
                      Read Full Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-medium text-gray-300">No valid news articles found.</p>
            </div>
          )}

          {loadingMore && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-300 font-medium">Loading more news...</p>
            </div>
          )}

          {!hasMoreNews && !loadingMore && news.length > 0 && (
            <div className="text-center mt-12 py-8 border-t border-gray-700">
              <p className="text-lg font-medium text-gray-300">
                You&apos;ve reached the end of available news articles.
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NewsPage;