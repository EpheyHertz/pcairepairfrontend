'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import Cookies from 'js-cookie';
const Profile = () => {
  const [userData, setUserData] = useState({});
  const [chats, setChats] = useState([]);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = Cookies.get('accessToken')
        const response = await axios.get('https://pcrepair.vercel.app/apis/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoadingUserData(false);
      }
    };

    const fetchChats = async () => {
      try {
        const accessToken = Cookies.get('accessToken')
        const response = await axios.get('https://pcrepair.vercel.app/apis/user/chats/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      } finally {
        setLoadingChats(false);
      }
    };

    fetchUserData();
    fetchChats();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-[80vh] items-center justify-center mx-auto py-8 px-6 md:w-[70%] lg:w-[60%]">
        {/* Profile and chats section */}
        <div className="bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-3xl w-full">
          <div className="flex flex-col lg:flex-row lg:space-x-6 lg:items-start">
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              {userData.profile_picture ? (
                <img
                  src={userData.profile_picture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                />
              ) : (
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gray-800 border-4 border-indigo-500">
                  <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 14c-3.313 0-6-2.686-6-6s2.687-6 6-6 6 2.686 6 6-2.687 6-6 6zm0 2c3.313 0 10 1.686 10 5v1H2v-1c0-3.314 6.687-5 10-5z" fill="white" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-grow text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Profile Information</h2>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-1">Username</label>
                <p className="text-gray-100">{userData.username}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-1">Full Name</label>
                <p className="text-gray-100">{userData.fullname || 'Not Provided'}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-1">Email</label>
                <p className="text-gray-100">{userData.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm mb-1">About</label>
                <p className="text-gray-400">{userData.about || 'No bio available'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Chat History</h3>
          {loadingChats ? (
            <p className="text-gray-400">Loading chats...</p>
          ) : chats.length > 0 ? (
            <ul className="bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-700 max-h-[50vh] overflow-y-auto">
              {chats.map((chat, id) => (
                <li key={id} className="p-4 hover:bg-gray-700">
                  <p className="text-gray-200">Chat with DocTech AI</p>
                  <span className="text-sm text-gray-400">{new Date(chat.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No chats yet.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
