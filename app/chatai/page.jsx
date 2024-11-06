




// export default ChatPage;
'use client';
import { useState, useEffect, useRef } from 'react';
import { FiSend, FiImage, FiX, FiMenu, FiSun, FiMoon, FiTrash } from 'react-icons/fi'; // Added FiTrash for delete button
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
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedChatId = localStorage.getItem('chatId');
    if (storedChatId) {
      setChatId(storedChatId);
    }

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('https://pcrepair.vercel.app/apis/user/chats/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setChatHistory(response.data); 
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [accessToken]);
useEffect(() => {
  // Auto-scroll to the bottom when selectedChat changes
  chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [selectedChat]);

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await axios.get(`https://pcrepair.vercel.app/apis/chats/${chatId}/messages/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

      if (chatId) {
        formData.append('chat_id', chatId);
      }

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
    // Ask for confirmation before deleting the chat
    const confirmDelete = window.confirm('Are you sure you want to delete this chat?');
  
    if (confirmDelete) {
      try {
        const accessToken = Cookies.get('accessToken');
        await axios.delete(`https://pcrepair.vercel.app/apis/chats/delete/${chatId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        localStorage.removeItem('chatId');
        alert('Chat deleted successfully');
        // Optionally, update the chat list in the frontend after deletion
      } catch (error) {
        console.error('Failed to delete chat:', error);
        alert('Failed to delete chat');
      }
    } else {
      // If user cancels the deletion
      alert('Chat deletion cancelled');
    }
  };
  
  
 
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ProtectedRoute>
    <div className={`flex flex-col h-screen  lg:flex-row ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Left Side (Chat History) */}
      <aside
        className={`p-4 lg:w-64 flex-shrink-0 transition-all duration-300 ease-in-out ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} ${
          isMobile ? (showHistory ? 'absolute inset-0 mt-20 w-full z-10' : 'hidden') : 'block'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Chat History</h2>
          {isMobile && (
            <button onClick={() => setShowHistory(false)}>
              <FiX className="text-2xl hover:text-red-500" />
            </button>
          )}
        </div>
        <ul className="overflow-y-auto h-full">
          {chatHistory.map((chat, id) => (
            <li
              key={id}
              className={`p-2 border-b cursor-pointer flex justify-between ${selectedChat && chat.chat_id === chatId ? 'bg-blue-600 text-white' : ''}`}
              onClick={() => fetchChatMessages(chat.id)}
            >
              <div>
                {chat.title ? (
                  chat.title
                ) : (
                  <div>
                    <h3 className='text-gray-500'>Chat With DocTech</h3>
                    <span className="text-sm text-gray-400">{new Date(chat.created_at).toLocaleString()}</span>
                  </div>
                )}
              </div>
              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering fetchChatMessages on click
                  deleteChat(chat.id);
                }}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
          {chatHistory.length === 0 && <li className="text-gray-400">No past chats.</li>}
        </ul>
      </aside>

      {/* Main Chat Area */}
       {/* Main Chat Area */}
       <main className="flex-1 flex flex-col justify-between p-4 lg:p-6 relative overflow-y-auto">
        {isMobile && !showHistory && (
          <button
            onClick={() => setShowHistory(true)}
            className="absolute top-4 left-4 bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-600  lg:hidden"
          >
            <FiMenu size={24} />
          </button>
        )}

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 rounded-lg shadow-lg h-full">
          {selectedChat && selectedChat.length > 0 ? (
            selectedChat.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.isUser || chat.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg shadow-md ${chat.sender === 'user'|| chat.isUser ? 'bg-blue-200 text-white' : 'bg-gray-300 text-black'}`}>
                  <p className="text-sm font-bold">
                    {chat.sender ==='user' || chat.isUser ? 'You' : 'DocTech'}
                  </p>
                  <ReactMarkdown>{chat.message}</ReactMarkdown>
                  {chat.image_url && (
                    <img src={chat.image_url} alt="Sent Image" className="w-20 h-20 object-cover rounded-lg mt-2" />
                  )}
                </div>
                
                <div ref={chatEndRef} /> {/* Scroll anchor for new messages */}


                
                
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center">Start a new conversation...</div>
          )}
          {isSending && (
  <div className="mb-4 text-left">
    <div className={`inline-block p-3 rounded-lg shadow-md bg-gray-300 text-black animate__animated animate__fadeIn`}>
      <p className="text-sm font-bold">DocTech</p>
      <div className="flex justify-center items-center gap-2 mt-2">
        {/* Using Tailwind for spacing and positioning */}
        <div className="animate__animated animate__bounce animate__delay-1s w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="animate__animated animate__bounce animate__delay-1.5s w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="animate__animated animate__bounce animate__delay-2s w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
    </div>
    
  </div>
  
  
)}
<div ref={chatEndRef} /> {/* Scroll anchor for new messages */}
          
          {selectedImage && (
            <div className="flex justify-between items-center mt-4 bg-gray-700 p-3 rounded-lg">
              <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
              <button onClick={() => setSelectedImage(null)} className="text-red-500 hover:text-red-700 p-2">
                <FiX size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Chat input area */}
        <div className="mt-4 flex flex-wrap items-center p-3 rounded-lg shadow-md relative">
  {selectedChat && selectedChat.length > 0 && (
    <button onClick={startNewChat} className="text-red-500 hover:text-red-700 p-2">
      <FiX size={24} />
    </button>
  )}

  {/* Textarea that expands as user types */}
  <textarea
    value={message}
    onChange={(e) => {
      setMessage(e.target.value);
      e.target.style.height = 'auto'; // Reset the height
      e.target.style.height = `${e.target.scrollHeight}px`; // Set it to the scroll height to expand
    }}
    placeholder="Type a message..."
    className={`flex-1 p-2 rounded-lg focus:outline-none mr-2 w-full md:w-auto resize-none overflow-hidden ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
    rows="1"
  />

  <button onClick={() => fileInputRef.current.click()} className="text-blue-500 hover:text-blue-700 p-2">
    <FiImage size={24} />
  </button>
  <input
    type="file"
    ref={fileInputRef}
    style={{ display: 'none' }}
    accept="image/*"
    onChange={(e) => setSelectedImage(e.target.files[0])}
  />


  <button
    onClick={sendMessage}
    disabled={isSending}
    className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg p-2 ml-2 disabled:bg-blue-300"
  >
    <FiSend size={24} />
  </button>

  {/* Theme Toggle Button */}
  <button onClick={toggleTheme} className="ml-2 p-2 rounded-full">
    {theme === 'light' ? <FiMoon size={24} className="text-black" /> : <FiSun size={24} />}
  </button>
  </div>

  </main>
    </div>
    </ProtectedRoute>
  );
};

export default ChatPage;

