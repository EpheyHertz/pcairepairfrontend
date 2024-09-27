'use client';
import { useEffect } from 'react';
import axios from 'axios';

const TokenRefresher = () => {
  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        return; // No refresh token available
      }

      try {
        const response = await axios.post('https://aipcrepair.onrender.com/apis/token/refresh/', {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;

        // Update local storage with new access token
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        // Update the expiration time
        const expirationTime = Date.now() + (4 * 60 * 1000); // Set expiration to 4 minutes from now
        localStorage.setItem('tokenExpiration', expirationTime.toString());

      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    const checkAndRefreshToken = () => {
      const expirationTime = localStorage.getItem('tokenExpiration');
      const currentTime = Date.now();

      // Check if the token will expire in 5 minutes or less
      if (expirationTime && (parseInt(expirationTime) - currentTime) <= (5 * 60 * 1000)) {
        refreshAccessToken();
      }
    };

    // Set an interval to check every minute
    const intervalId = setInterval(checkAndRefreshToken, 60 * 1000); // Check every 1 minute

    // Refresh the token every 4 minutes
    const refreshIntervalId = setInterval(refreshAccessToken, 4 * 60 * 1000); // Refresh every 4 minutes

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(refreshIntervalId);
    };
  }, []);

  return null; // This component does not need to render anything
};

export default TokenRefresher;
