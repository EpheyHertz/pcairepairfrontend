// components/ProtectedRoute.jsx
'use client'
import { useAuth } from '../context/AuthContext'; // Adjust the path if necessary
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // const accessToken =localStorage.getItem('accessToken');
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); // Accessing localStorage should be done inside useEffect
    if (typeof window !== 'undefined') {
      // Ensure that localStorage is available in the browser
      const checkTokenValidity = async () => {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken); // Check the token value

        if (!accessToken) {
          // If no access token, redirect to login page
          router.push('/auth/login');
          return;
        }

        try {
          // Validate token by making a request to the backend
          const response = await axios.get('https://aipcrepair.onrender.com/apis/validate-token/', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.status === 200) {
            console.log("Token is valid");
          }
        } catch (error) {
          // Token is invalid, remove it and redirect to login
          console.error('Token is invalid or expired:', error);
          localStorage.removeItem('accessToken');
          router.push('/auth/login');
          localStorage.removeItem('chatId')
        }
      };

      checkTokenValidity();
    }

  
  
  }, [router]);


  // If not authenticated, return null or a loading spinner
 

  return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
