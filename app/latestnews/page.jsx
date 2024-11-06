'use client';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProtectedRoute from '../components/ProtectedRoute';
import { throttle } from 'lodash';
import Cookies from 'js-cookie'
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
    setLoadingMore(true); // Set loadingMore to true when fetching
    setArticlesRendering(true);
    try {
      const res = await axios.get(`https://pcrepair.vercel.app/apis/tech-news/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.results)
      // console.log(res.data.articles)
      const newArticles = res.data.articles || [];
      const hasNext = res.data.has_next
      // console.log(hasNext)

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
  }, []); // Empty dependency array ensures fetchNews is memoized and not recreated on every render

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
  }, [page, fetchNews]); // Add fetchNews as a dependency here

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
          console.log('Reached 50 articles, incrementing page.');
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

  // Spinner while loading
  if (loading && !loadingMore) {
    return (
      <div style={spinnerContainerStyle}>
        <div style={spinnerStyle}></div>
        <p>Loading news, please wait...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div style={newsPageStyle} className="rounded-3xl shadow-lg overflow-x-clip">
        <h1 style={headingStyle}>Latest News</h1>
        <div style={newsGridStyle}>
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} style={newsCardStyle}>
                <img
                  src={article.image_url || article.urlToImage || '/images/technews.jpg'}
                  alt={article.title || 'No image available'}
                  style={newsImageStyle}
                />
                <h2 style={newsTitleStyle}>{article.title || 'Title not available'}</h2>
                <p style={newsDescriptionStyle}>{article.snippet || 'Snippet not available'}</p>
                <p style={newsDescriptionStyle}>{article.description || 'Description not available'}</p>
                <p style={newsDescriptionStyle}>{article.keywords || 'Keywords not available'}</p>
                <p style={newsMetaStyle}>
                  <strong>By: {article.author || article.source__name || article.source}</strong> |{' '}
                  <strong>From: {article.source__name || article.source }</strong> |{' '}
                  <span>{formatDate(article.published_at) || formatDate(article.publishedAt)}</span>
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={readMoreStyle}>
                  Read more &rarr;
                </a>
              </div>
            ))
          ) : (
            <p className="text-white">No valid news articles found.</p>
          )}
        </div>

        {loadingMore && (
          <div style={spinnerContainerStyle}>
            <div style={spinnerStyle}></div>
            <p>Loading more news...</p>
          </div>
        )}

        {!hasMoreNews && !loadingMore && (
          <p style={noMoreNewsStyle}>No more news to load.</p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default NewsPage;

// Inlined CSS styles here...


// CSS Styles

const newsPageStyle = {
  padding: '20px',
  backgroundImage: 'url("/images/technews3.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '32px',
  color: 'white',
  textAlign: 'center',
  marginBottom: '30px',
  fontWeight: 'bold',
};

const newsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
  width: '100%',
  maxWidth: '1200px',
  justifyContent: 'center',
};

const newsCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'center',
};

const newsImageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
};

const newsTitleStyle = {
  fontSize: '20px',
  color: '#333',
  margin: '20px 0 10px',
  fontWeight: 'bold',
};

const newsDescriptionStyle = {
  fontSize: '16px',
  color: '#666',
  marginBottom: '20px',
};

const newsMetaStyle = {
  fontSize: '14px',
  color: '#888',
  marginBottom: '10px',
};

const readMoreStyle = {
  display: 'inline-block',
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '10px 15px',
  borderRadius: '5px',
  textDecoration: 'none',
  transition: 'background-color 0.2s',
  marginTop: '10px',
};

readMoreStyle[':hover'] = {
  backgroundColor: '#2980b9',
};

const spinnerContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f4f7',
  width: '100%',
};

const spinnerStyle = {
  border: '6px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '6px solid #3498db',
  width: '60px',
  height: '60px',
  animation: 'spin 1s linear infinite',
};

const noMoreNewsStyle = {
  textAlign: 'center',
  marginTop: '20px',
  color: '#888',
  fontSize: '18px',
};

if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  const keyframes =
    '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}
