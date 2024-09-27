'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Accessing context
  const router = useRouter();
 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login'); 
    // Optionally redirect to login page
  };

  return (
    <nav className="bg-transparent p-4 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link href="/" className="text-white font-bold text-xl">Doctech</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          
          {!isAuthenticated ? (
            <>
              <Link href="/" className="text-white hover:text-blue-300 transition duration-200">Home</Link>
              <Link href="/auth/signup" className="text-white hover:text-blue-300 transition duration-200">Signup</Link>
              <Link href="/auth/login" className="text-white hover:text-blue-300 transition duration-200">Login</Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="text-white hover:text-blue-300 transition duration-200">Profile</Link>
              <Link href="/updateprofile" className="text-white hover:text-blue-300 transition duration-200">Update Profile</Link>
              <Link href="/talktous" className="text-white hover:text-blue-300 transition duration-200">Talk To Us</Link>
              <Link href="/chatai" className="text-white hover:text-blue-300 transition duration-200">Chat with AI</Link>
              <button onClick={handleLogout} className="text-white hover:text-blue-300 transition duration-200">Logout</button>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg> // Close icon
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg> // Menu icon
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#1e3a8a] rounded-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
            <Link href="/" className="text-white hover:text-blue-300 transition duration-200">Home</Link>
            {!isAuthenticated ? (
              <>
                <Link href="/auth/signup" className="text-white hover:text-blue-300 transition duration-200">Sign Up</Link>
                <Link href="/auth/login" className="text-white hover:text-blue-300 transition duration-200">Log In</Link>
              </>
            ) : (
              <>
                <Link href="/profile" className="text-white hover:text-blue-300 transition duration-200">Profile</Link>
                <Link href="/updateprofile" className="text-white hover:text-blue-300 transition duration-200">Update Profile</Link>
                <Link href="/talktous" className="text-white hover:text-blue-300 transition duration-200">Talk to Us</Link>
                <Link href="/chatai" className="text-white hover:text-blue-300 transition duration-200">Chat with AI</Link>
                <button onClick={handleLogout} className="text-white hover:text-blue-300 transition duration-200">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;