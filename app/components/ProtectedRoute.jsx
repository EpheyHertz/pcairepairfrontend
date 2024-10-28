// components/ProtectedRoute.jsx
'use client';
import { useAuth } from '../context/AuthContext'; // Adjust the path if necessary
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = Cookies.get('accessToken'); // Retrieve accessToken from cookies

      if (!accessToken) {
        // If no access token, redirect to login page
        router.push('/auth/login');
        return;
      }

      try {
        // Validate token by making a request to the backend
        const response = await axios.get('https://aipcrepair.onrender.com/apis/validate-token/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          console.log("Token is valid");
        }
      } catch (error) {
        // Token is invalid, remove it and redirect to login
        console.error('Token is invalid or expired:', error);
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
        router.push('/auth/login');
        localStorage.removeItem('chatId'); // Clear any other auth-related local storage if needed
      }
    };

    // Execute the token check
    checkTokenValidity();
  }, [router]);

  // Render children if authenticated
  return <>{children}</> // Optionally, add a loading spinner
};

export default ProtectedRoute;
