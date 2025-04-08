'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setIsServicesOpen(false);
        setIsCommunityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const accessToken = Cookies.get('accessToken');

  const handleLogout = () => {
    axios.post('https://pcrepair.vercel.app/apis/logout/', {}, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(() => {
      logout();
      router.push('/auth/login');
    })
    .catch(error => console.error('Logout failed:', error));
  };

  const ServicesDropdown = () => (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl p-4 dropdown-container">
      <div className="text-black space-y-3">
        <Link href="/chatai" className="block hover:bg-blue-50 p-3 rounded-lg transition-all">
          <span className="font-medium text-blue-600">AI Assistant</span>
          <p className="text-sm text-gray-600 mt-1">24/7 Tech Support</p>
        </Link>
      </div>
    </div>
  );

  const CommunityDropdown = () => (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl p-4 dropdown-container">
      <div className="text-black space-y-3">
        <Link href="https://doctechcommunity.onrender.com" className="block hover:bg-blue-50 p-3 rounded-lg transition-all">
          <span className="font-medium text-blue-600">Forums</span>
          <p className="text-sm text-gray-600 mt-1">Join Discussions</p>
        </Link>
      </div>
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 backdrop-blur-md shadow-lg rounded-b-xl border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
          Doctech
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="relative dropdown-container"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="text-white hover:text-blue-100 px-3 py-2 rounded-lg font-medium transition-colors">
              AI Services
            </button>
            {isServicesOpen && <ServicesDropdown />}
          </div>

          <div className="relative dropdown-container"
            onMouseEnter={() => setIsCommunityOpen(true)}
            onMouseLeave={() => setIsCommunityOpen(false)}
          >
            <button className="text-white hover:text-blue-100 px-3 py-2 rounded-lg font-medium transition-colors">
              Community
            </button>
            {isCommunityOpen && <CommunityDropdown />}
          </div>

          <Link href="/latestnews" className="text-white hover:text-blue-100 px-3 py-2 rounded-lg font-medium transition-colors">
            Tech News
          </Link>

          <div className="flex items-center space-x-4 ml-4">
            {!isAuthenticated ? (
              <>
                <Link href="/auth/login" className="bg-white text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-50 transition-all font-medium shadow-sm">
                  Login
                </Link>
                <Link href="/auth/signup" className="text-white px-5 py-2 rounded-xl border-2 border-white hover:bg-white/10 transition-all font-medium">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" className="text-white hover:text-blue-100 px-3 py-2 rounded-lg font-medium transition-colors">
                  Profile
                </Link>
               
                  <Link href="/updateprofile" className="text-white hover:text-blue-100 px-3 py-2 rounded-lg font-medium transition-colors">
                    Update Profile
                  </Link>
                  <Link href="/talktous" className="text-white hover:text-blue-100 px-3 py-2 rounded-lg font-medium transition-colors">
                    Talk To Us
                  </Link>
                <button onClick={handleLogout} className="text-white hover:text-red-100 px-3 py-2 rounded-lg font-medium transition-colors">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border rounded-xl shadow-xl mt-2 mx-4">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <div className="border-b border-gray-200 pb-2">
              <button onClick={() => setMobileDropdown(mobileDropdown === 'services' ? '' : 'services')} 
                      className="w-full text-left text-gray-700 p-2 hover:bg-blue-50 rounded-lg">
                AI Services
              </button>
              {mobileDropdown === 'services' && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link href="/chatai" className="block p-2 text-gray-600 hover:bg-blue-50 rounded-lg">
                    AI Assistant
                  </Link>
                </div>
              )}
            </div>

            <div className="border-b border-gray-200 pb-2">
              <button onClick={() => setMobileDropdown(mobileDropdown === 'community' ? '' : 'community')} 
                      className="w-full text-left text-gray-700 p-2 hover:bg-blue-50 rounded-lg">
                Community
              </button>
              {mobileDropdown === 'community' && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link href="https://doctechcommunity.onrender.com" className="block p-2 text-gray-600 hover:bg-blue-50 rounded-lg">
                    Forums
                  </Link>
                </div>
              )}
            </div>

            <Link href="/latestnews" className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              Tech News
            </Link>

            <div className="pt-4 space-y-2">
              {!isAuthenticated ? (
                <>
                  <Link href="/auth/login" className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="block w-full text-center text-blue-600 px-4 py-2 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile" className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg">
                    Profile
                  </Link>
                  <Link href="/talktous" className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg">
                  Talk To Us
                  </Link>
                  <Link href="/updateprofile" className="block p-2 text-gray-700 hover:bg-blue-50 rounded-lg">
                    Update Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;