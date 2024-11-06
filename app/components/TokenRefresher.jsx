'use client';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const TokenRefresher = () => {
  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = Cookies.get('refreshToken');

      if (!refreshToken) {
        return; // No refresh token available
      }

      try {
        const response = await axios.post('https://pcrepair.vercel.app/apis/token/refresh/', {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;

        // Update cookies with new tokens
        Cookies.set('accessToken', access, { path: '/' });
        Cookies.set('refreshToken', refresh, { path: '/' });

        // Update the expiration time in a cookie
        const expirationTime = Date.now() + 4 * 60 * 1000; // Set expiration to 4 minutes from now
        Cookies.set('tokenExpiration', expirationTime.toString(), { path: '/' });

      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    const checkAndRefreshToken = () => {
      const expirationTime = Cookies.get('tokenExpiration');
      const currentTime = Date.now();

      // Check if the token will expire in 5 minutes or less
      if (expirationTime && parseInt(expirationTime) - currentTime <= 5 * 60 * 1000) {
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
