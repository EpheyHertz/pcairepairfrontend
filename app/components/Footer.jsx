
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-center">
        <p className="text-gray-400">
          &copy; 2024 DocTech. All rights reserved. | 
          <Link href="https://epheyhertz.github.io/doctechprivacyandterms/" className="text-blue-400 hover:underline ml-2">
            Privacy Policy
          </Link>
        </p>
    </footer>
  );
}

export default Footer;
