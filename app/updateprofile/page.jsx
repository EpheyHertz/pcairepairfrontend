'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [chats, setChats] = useState([]);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [about, setAbout] = useState('');
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://pcrepair.vercel.app/apis/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
        setUsername(response.data.username);
        setFullname(response.data.fullname || '');
        setAbout(response.data.about || '');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoadingUserData(false);
      }
    };

    const fetchChats = async () => {
      try {
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
  }, [accessToken]);

  // Handle file change and create preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullname', fullname);
    formData.append('about', about);
    if (file) {
      formData.append('picture', file);
    }

    try {
      await axios.put('https://pcrepair.vercel.app/apis/profile/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
      
      // Refresh user data
      const response = await axios.get('https://pcrepair.vercel.app/apis/profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserData(response.data);
      setFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Format date for display
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

  // Loading skeleton
  const ProfileSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-700 mb-6"></div>
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
        <div className="space-y-4 w-full">
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-12 bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-12 bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-24 bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-14 bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white w-full">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Header with tabs */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Manage Your Profile
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
                Edit Profile
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

          {/* Profile Update Section */}
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
                <div className="p-8">
                  {/* Success Message */}
                  {updateSuccess && (
                    <div className="bg-emerald-500 bg-opacity-90 text-white px-4 py-3 rounded-lg mb-6 flex items-center shadow-lg animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Profile updated successfully!</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Picture Section */}
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="relative group mb-6">
                        {previewImage || userData.profile_picture ? (
                          <img 
                            src={previewImage || userData.profile_picture} 
                            alt="Profile" 
                            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg transition-all duration-300 group-hover:opacity-80"
                          />
                        ) : (
                          <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-700 border-4 border-indigo-500 shadow-lg">
                            <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <label htmlFor="profile-picture" className="cursor-pointer bg-indigo-600 bg-opacity-90 text-white p-2 rounded-lg shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </label>
                          <input 
                            id="profile-picture" 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">
                        {userData.username}
                      </h2>
                      
                      <p className="text-gray-400 text-center mb-6">{userData.email}</p>
                      
                      <div className="flex flex-col space-y-2 items-center text-sm text-gray-300">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Joined {userData.created_at ? formatDate(userData.created_at).split(',')[0] : 'Recently'}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                          <span>{chats.length} Chats</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Form Section */}
                    <div className="md:w-2/3">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-indigo-300 mb-2 font-medium">Username</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="pl-10 w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
                              placeholder="Enter your username"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-indigo-300 mb-2 font-medium">Full Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              value={fullname}
                              onChange={(e) => setFullname(e.target.value)}
                              className="pl-10 w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-indigo-300 mb-2 font-medium">About Me</label>
                          <div className="relative">
                            <textarea
                              value={about}
                              onChange={(e) => setAbout(e.target.value)}
                              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
                              placeholder="Write something about yourself..."
                              rows="4"
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Tell others about your expertise and interests</p>
                        </div>
                        
                        <div className="mt-8">
                          <button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-lg transition duration-300 relative overflow-hidden ${
                              isUpdating ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                            }`}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              {isUpdating ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Updating Profile...
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Save Changes
                                </>
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Chat History Section */}
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
                    Your Conversation History
                  </h2>
                  <span className="bg-indigo-600 text-xs text-white px-3 py-1 rounded-full">
                    {chats.length} Total
                  </span>
                </div>
                
                {loadingChats ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="h-20 bg-gray-700 rounded-lg"></div>
                    ))}
                  </div>
                ) : chats.length > 0 ? (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {chats.map((chat, id) => (
                      <div 
                        key={id} 
                        className="bg-gray-700 bg-opacity-60 rounded-xl p-4 hover:bg-gray-600 transition-colors duration-300 border border-gray-600 transform hover:scale-[1.01] cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4 shadow-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-white">DocTech AI Consultation</p>
                              <p className="text-xs text-gray-400 mt-1">{formatDate(chat.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-indigo-400 hover:text-indigo-300 p-1 rounded-full hover:bg-gray-700 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </button>
                            <button className="text-indigo-400 hover:text-indigo-300 p-1 rounded-full hover:bg-gray-700 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {chat.summary && (
                          <p className="text-sm text-gray-300 mt-3 line-clamp-2 pl-16">
                            {chat.summary}
                          </p>
                        )}
                        <div className="flex mt-3 pt-3 border-t border-gray-600 pl-16">
                          <button className="text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-full flex items-center shadow-lg shadow-indigo-700/20 transition-colors duration-300">
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
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-300 mb-2">No Chats Yet</h3>
                    <p className="text-gray-400 max-w-md mb-6">Start a conversation with DocTech AI to get assistance with your technical issues.</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white transition-colors duration-300 shadow-lg shadow-indigo-700/30">
                      Start New Chat
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Footer */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>DocTech AI • Secure User Profile Management</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;