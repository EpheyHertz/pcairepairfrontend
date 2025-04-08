'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Nav from './Nav'; // Import your Nav component

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowNavbar(false); // Scrolling down
    } else {
      setShowNavbar(true); // Scrolling up
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={`fixed top-0 left-0 right-0  text-white shadow-md transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto py-4 px-6 z-10">
            <Nav />
        </div>
    </header>
  );
};

export default Navbar;
