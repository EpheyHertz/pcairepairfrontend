'use client'
import { useEffect, useState } from 'react';
// import Link from 'next/link';
import axios from 'axios';
import ProtectedRoute from '../components/ProtectedRoute';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchNews();
  });

  const fetchNews = async () => {

    const token = localStorage.getItem('accessToken');
    try {
      const res = await axios.get('https://aipcrepair.onrender.com/apis/tech-news/', {
        headers: {
          'Authorization': `Bearer ${token}` // Send the token in the request header
        }
      });
      // console.log(res.data)
      const newArticles = res.data || [];

      // Filter out articles with removed content
      const filteredArticles = newArticles.filter(article => {
        return !isArticleRemoved(article);
      });

      if (filteredArticles.length === 0) {
        setHasMoreNews(false);
      } else {
        setNews((prevNews) => [...prevNews, ...filteredArticles]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

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

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== 
        document.documentElement.offsetHeight || 
        loadingMore
      ) {
        return;
      }
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore]);

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
    <div style={newsPageStyle} className='rounded-3xl shadow-lg'>
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
              <strong>By: {article.author || article.source}</strong> |{' '}
              <strong>From: {article.source || article.author}</strong> |{' '}
              <span>{formatDate(article.published_at) || formatDate(article.publishedAt)}</span>
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={readMoreStyle}>
              Read more &rarr;
            </a>
          </div>
        ))
      ) : (
        <p className='text-white'>No valid news articles found.</p>
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

// Inlined CSS styles

const newsPageStyle = {
  padding: '20px',
  backgroundImage: 'url("/images/technews3.jpg")',
  backgroundSize: 'cover',
            // Ensures the image covers the whole background
  backgroundPosition: 'center',     // Centers the background image
  backgroundRepeat: 'no-repeat',    // Prevents repeating the image
  minHeight: '100vh',               // Ensures the section covers the entire viewport height
  width: '100%',                    // Makes the section full width
  display: 'flex',                  // Flexbox to center content
  flexDirection: 'column',          // Align content vertically
  alignItems: 'center',             // Horizontally center content
  justifyContent: 'center',         // Vertically center content
  textAlign: 'center',              // Centers text in the content
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

// Keyframes for spinner
if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  const keyframes =
    '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}