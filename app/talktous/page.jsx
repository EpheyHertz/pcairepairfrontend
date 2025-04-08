'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import Cookies from 'js-cookie';

const TalkToUs = () => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setErrorMessage('Unable to load your profile data. Please try refreshing the page.');
      }
    };
    fetchUserData();
  }, [accessToken]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage('Please enter a message before sending.');
      return;
    }
    
    setIsSending(true);
    setErrorMessage('');
    
    try {
      await axios.post('https://pcrepair.vercel.app/apis/contact-us/', {
        email: userData.email,
        full_name: userData.fullname,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      setShowSuccessMessage(true);
      setMessage(''); // Clear the message field after sending
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen py-12 px-4 sm:px-6 w-full">
        <div className="max-w-3xl mx-auto">
          {/* Card Container */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700 border-opacity-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
              <h2 className="text-3xl font-bold text-white mb-1 relative z-10">Talk to Us</h2>
              <p className="text-blue-100 relative z-10">We value your feedback and are here to help</p>
            </div>
            
            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Success Message */}
              {showSuccessMessage && (
                <div className="mb-6 bg-green-900 bg-opacity-40 border border-green-500 text-green-200 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                </div>
              )}
              
              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 bg-red-900 bg-opacity-40 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}
              
              {/* Form Fields */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-blue-200 mb-2 font-medium" htmlFor="full-name">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="full_name"
                      value={userData.fullname || ''}
                      readOnly
                      className="pl-10 block w-full bg-gray-800 bg-opacity-40 border border-gray-700 rounded-lg py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-blue-200 mb-2 font-medium" htmlFor="email">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={userData.email || ''}
                      readOnly
                      className="pl-10 block w-full bg-gray-800 bg-opacity-40 border border-gray-700 rounded-lg py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-blue-200 mb-2 font-medium" htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you today?"
                    rows="5"
                    className="block w-full bg-gray-800 bg-opacity-40 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    {message.length > 0 ? `${message.length} characters` : 'Tell us how we can assist you'}
                  </p>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={handleSendMessage}
                    disabled={isSending}
                    className={`w-full relative overflow-hidden group rounded-lg ${
                      isSending 
                        ? 'bg-blue-800 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                    } text-white py-3 px-6 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    <span className="absolute right-0 top-0 w-12 h-full transform translate-x-12 group-hover:translate-x-40 transition-all duration-1000 bg-white opacity-10 rotate-12"></span>
                    <div className="flex justify-center items-center">
                      {isSending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                          </svg>
                          Send Message
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="mt-8 pt-6 border-t border-gray-700 border-opacity-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-800 bg-opacity-30 p-2 rounded-lg">
                        <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-blue-300">Phone Support</h4>
                      <p className="mt-1 text-sm text-gray-300">Mon-Fri from 8am to 5pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-800 bg-opacity-30 p-2 rounded-lg">
                        <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-blue-300">Email Support</h4>
                      <p className="mt-1 text-sm text-gray-300">24/7 response time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-blue-200 opacity-80">
            Your privacy is important to us. We&apos;ll never share your information without your permission.
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TalkToUs;