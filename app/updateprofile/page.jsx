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
  const [isUpdating, setIsUpdating] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [about, setAbout] = useState('');
  const [file, setFile] = useState(null);
  const accessToken = Cookies.get('accessToken')
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
        setFullname(response.data.fullname);
        setAbout(response.data.about);
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
      alert('Profile updated successfully!');
      setFile(null);
      setUsername('');
      setFullname('');
      setAbout('');
      const response = await axios.get('https://pcrepair.vercel.app/apis/profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-6 md:w-[70%] lg:w-[80%] flex items-center justify-center">
        <div className="flex flex-col items-center bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg w-full lg:max-w-2xl">
          <div className="flex items-center mb-6">
            {userData.profile_picture ? (
              <img src={userData.profile_picture} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500" />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-800 border-4 border-indigo-500">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 14c-3.313 0-6-2.686-6-6s2.687-6 6-6 6 2.686 6 6-2.687 6-6 6zm0 2c3.313 0 10 1.686 10 5v1H2v-1c0-3.314 6.687-5 10-5z" fill="white" />
                </svg>
              </div>
            )}
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">{userData.username}</h2>
          
          {/* Update Profile Form */}
          <div className="w-full space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">About Me</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Profile Picture</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>

            <button
              onClick={handleUpdate}
              className={`w-full bg-blue-600 text-white p-3 rounded ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>

        {/* Chat History */}
        {/* <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Chat History</h3>
          {loadingChats ? (
            <p className="text-gray-400">Loading chats...</p>
          ) : chats.length > 0 ? (
            <ul className="bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-700">
              {chats.map((chat, index) => (
                <li key={index} className="p-4 hover:bg-gray-700">
                  <p className="text-gray-200">{chat.message}</p>
                  <span className="text-sm text-gray-400">{new Date(chat.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No chats yet.</p>
          )} */}
        {/* </div> */}
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
