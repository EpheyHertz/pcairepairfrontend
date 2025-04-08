'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [chats, setChats] = useState([]);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Loading skeleton for profile
  const ProfileSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex flex-col lg:flex-row lg:space-x-6 lg:items-start">
        <div className="flex-shrink-0 mb-6 lg:mb-0">
          <div className="w-32 h-32 rounded-full bg-gray-700"></div>
        </div>
        <div className="flex-grow">
          <div className="h-8 bg-gray-700 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-3 w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded mb-3 w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded mb-3 w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded mb-3 w-full"></div>
        </div>
      </div>
    </div>
  );

  // Loading skeleton for chats
  const ChatsSkeleton = () => (
    <div className="animate-pulse">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="h-16 bg-gray-700 rounded mb-3"></div>
      ))}
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white w-full flex items-center justify-center p-4">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Header with tabs */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Your Profile Dashboard
            </h1>
            
            <div className="flex justify-center space-x-4 mb-8">
              <button
                className={`px-6 py-3 rounded-full text-lg transition-all duration-300 ${
                  activeTab === 'profile' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`px-6 py-3 rounded-full text-lg transition-all duration-300 ${
                  activeTab === 'chats' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
                onClick={() => setActiveTab('chats')}
              >
                Chat History
              </button>
            </div>
          </div>

          {/* Profile Section */}
          {activeTab === 'profile' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-90 border border-gray-700"
            >
              {loadingUserData ? (
                <div className="p-8">
                  <ProfileSkeleton />
                </div>
              ) : (
                <>
                  {/* Profile Header/Banner */}
                  <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                  
                  <div className="p-8 relative">
                    {/* Profile Picture */}
                    <div className="absolute -top-16 left-8 ring-4 ring-gray-800 rounded-full">
                      {userData.profile_picture ? (
                        <img
                          src={userData.profile_picture}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gray-700 border-4 border-indigo-500 shadow-lg">
                          <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* User Stats */}
                    <div className="flex justify-end mb-12">
                      <div className="flex space-x-4 text-sm">
                        <div className="text-center px-4 py-2 bg-gray-700 rounded-lg">
                          <span className="block text-2xl font-bold text-indigo-400">{chats.length}</span>
                          <span className="text-gray-400">Chats</span>
                        </div>
                        <div className="text-center px-4 py-2 bg-gray-700 rounded-lg">
                          <span className="block text-2xl font-bold text-indigo-400">
                            {userData.member_since ? new Date(userData.member_since).getFullYear() : new Date().getFullYear()}
                          </span>
                          <span className="text-gray-400">Member Since</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile Content */}
                    <div className="mt-8 grid md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                          {userData.username}
                        </h2>
                        
                        <div className="space-y-4">
                          <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <label className="block text-indigo-300 text-sm mb-1">Full Name</label>
                            <p className="text-white font-medium">{userData.fullname || 'Not Provided'}</p>
                          </div>
                          
                          <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                            <label className="block text-indigo-300 text-sm mb-1">Email</label>
                            <p className="text-white font-medium">{userData.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-indigo-300">About Me</h3>
                        <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg h-40">
                          <p className="text-gray-300">{userData.about || 'No bio available. Tell us about yourself!'}</p>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
  <Link href="/updateprofile" className="text-white hover:text-indigo-300 flex items-center">
    <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors duration-300 shadow-lg shadow-indigo-700/30 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
      Edit Profile
    </button>
  </Link>
</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Chats Section */}
          {activeTab === 'chats' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-90 border border-gray-700"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Chat History
                  </h2>
                  <span className="bg-indigo-600 text-xs text-white px-3 py-1 rounded-full">
                    {chats.length} Total
                  </span>
                </div>
                
                {loadingChats ? (
                  <ChatsSkeleton />
                ) : chats.length > 0 ? (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {chats.map((chat, id) => (
                      <div 
                        key={id} 
                        className="bg-gray-700 bg-opacity-60 rounded-xl p-4 hover:bg-gray-600 transition-colors duration-300 border border-gray-600"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-white">Chat with DocTech AI</p>
                              <p className="text-xs text-gray-400 mt-1">{formatDate(chat.created_at)}</p>
                            </div>
                          </div>
                          <button className="text-indigo-400 hover:text-indigo-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                          </button>
                        </div>
                        {chat.summary && (
                          <p className="text-sm text-gray-300 mt-3 line-clamp-2">
                            {chat.summary}
                          </p>
                        )}
                        <div className="flex mt-3 pt-3 border-t border-gray-600">
                          <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Chat
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-300 mb-2">No Chats Yet</h3>
                    <p className="text-gray-400 max-w-md">Start a conversation with DocTech AI to get assistance with your technical issues.</p>
                    <button className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors duration-300 shadow-lg shadow-indigo-700/30">
                      Start New Chat
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>DocTech AI • Your Personal Tech Assistant</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;