'use client';
import { useState, useEffect, useRef } from 'react';
import { FiSend, FiImage, FiX, FiMenu, FiSun, FiMoon, FiTrash, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import ProtectedRoute from '../components/ProtectedRoute';
import Cookies from 'js-cookie';
import 'animate.css';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [theme, setTheme] = useState('light');
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const accessToken = Cookies.get('accessToken');

  // Responsive layout handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Chat history and scroll management
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('https://pcrepair.vercel.app/apis/user/chats/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setChatHistory(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    const storedChatId = localStorage.getItem('chatId');
    if (storedChatId) setChatId(storedChatId);
    
    fetchChatHistory();
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [accessToken]);

  // Chat operations
  const fetchChatMessages = async (chatId) => {
    try {
      const response = await axios.get(`https://pcrepair.vercel.app/apis/chats/${chatId}/messages/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSelectedChat(response.data);
      setChatId(chatId);
      localStorage.setItem('chatId', chatId);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() && !selectedImage) return;
    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append('message', message);
      if (chatId) formData.append('chat_id', chatId);
      if (selectedImage) formData.append('image', selectedImage);

      const response = await axios.post('https://pcrepair.vercel.app/apis/chatbot-diagnose/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newChatId = response.data.chat_id;
      if (newChatId) {
        setChatId(newChatId);
        localStorage.setItem('chatId', newChatId);
      }

      const userChat = { message, image: selectedImage ? URL.createObjectURL(selectedImage) : null, isUser: true };
      const botChat = { message: response.data.response, image: null, isUser: false };
      setSelectedChat((prev) => [...prev, userChat, botChat]);
      setMessage('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const startNewChat = () => {
    setSelectedChat([]);
    setChatId(null);
    localStorage.removeItem('chatId');
  };

  const deleteChat = async (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        await axios.delete(`https://pcrepair.vercel.app/apis/chats/delete/${chatId}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
        if (chatId === chatId) startNewChat();
      } catch (error) {
        console.error('Failed to delete chat:', error);
      }
    }
  };

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ProtectedRoute>
      <div className={`h-screen w-screen grid grid-cols-1 lg:grid-cols-[300px_1fr] ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        
        {/* Chat History Sidebar */}
        <aside className={`relative h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl ${isMobile && !showHistory ? 'hidden' : 'block'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">DocTech Chat</h1>
              <div className="flex gap-2">
                <button onClick={startNewChat} className="p-2 rounded-lg bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600">
                  <FiPlus className="text-blue-600 dark:text-blue-400" />
                </button>
                {isMobile && (
                  <button onClick={() => setShowHistory(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FiX className="text-gray-600 dark:text-gray-300" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="h-[calc(100vh-80px)] overflow-y-auto p-2">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-4">No chat history available</div>
            ) : (
              chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => fetchChatMessages(chat.id)}
                  className={`group flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                    chat.id === chatId ? 'bg-blue-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {chat.title || 'New Chat'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(chat.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1"
                  >
                    <FiTrash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Main Chat Interface */}
        <main className="h-[calc(100vh-80px)] flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            {isMobile && (
              <button onClick={() => setShowHistory(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden">
                <FiMenu className="text-gray-600 dark:text-gray-300" size={20} />
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ml-2">
              {chatId ? 'Current Chat' : 'New Chat'}
            </h2>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {theme === 'light' ? (
                <FiMoon className="text-gray-600" size={20} />
              ) : (
                <FiSun className="text-yellow-400" size={20} />
              )}
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800">
            {selectedChat.map((chat, index) => (
              <div key={index} className={`flex ${chat.sender === 'user'|| chat.isUser  ? 'justify-end' : 'justify-start'} animate__animated animate__fadeIn`}>
                <div className={`max-w-[80%] lg:max-w-[60%] p-4 rounded-2xl shadow-sm ${
                  chat.sender === 'user'|| chat.isUser ? 'bg-blue-300 text-white rounded-br-none' : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-950 dark:text-gray-200">
                      {chat.sender ==='user' || chat.isUser  ? 'You' : 'DocTech'}
                    </span>
                  </div>
                  <ReactMarkdown className="prose dark:prose-invert text-sm text-black dark:text-white">
                    {chat.message}
                  </ReactMarkdown>
                  {chat.image_url && (
                    <img
                      src={chat.image_url}
                      alt="Attachment"
                      className="mt-3 rounded-lg border border-gray-200 dark:border-gray-700 max-w-[200px]"
                    />
                  )}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="max-w-[60%] p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  placeholder="Type your message..."
                  rows={1}
                  className={`w-full p-3 pr-12 rounded-xl border resize-none overflow-hidden focus:outline-none focus:ring-2 ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700 focus:ring-blue-500 text-white' : 'bg-white border-gray-200 focus:ring-blue-500 text-black'
                  }`}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiImage className="text-gray-600 dark:text-gray-300" size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={isSending}
                className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                  isSending ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <FiSend className="text-white" size={20} />
              </button>
            </div>
            
            {selectedImage && (
              <div className="mt-3 flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedImage.name}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <FiX className="text-gray-600 dark:text-gray-300" size={18} />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ChatPage;