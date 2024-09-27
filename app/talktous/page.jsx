'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';

const TalkToUs = () => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://aipcrepair.onrender.com/apis/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSendMessage = async () => {
    setIsSending(true);
    try {
      await axios.post('https://aipcrepair.onrender.com/apis/contact-us/', {
        email: userData.email,
        full_name: userData.fullname,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      alert('Message sent successfully!');
      setMessage(''); // Clear the message field after sending
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-6 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg w-full h-[80vh] max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Talk to Us</h2>
          <div className="w-full mb-4">
            <label className="block text-white mb-1" htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full_name"
              value={userData.fullname || ''}
              readOnly
              className="mb-2 w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-white mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={userData.email || ''}
              readOnly
              className="mb-2 w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-white mb-1" htmlFor="message">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="mb-2 w-full p-2 rounded bg-gray-800 text-white h-32"
            />
          </div>
          <button
            onClick={handleSendMessage}
            className={`bg-blue-600 text-white p-2 rounded w-full ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TalkToUs;
