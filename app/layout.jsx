import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext'; // Ensure the correct path
import TokenRefresher from "./components/TokenRefresher";

export const metadata = {
  title: "DOCTECH",
  description: "Lets Dive into PC related solutions Using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </head>
    <body className="min-h-screen flex flex-col bg-fixed bg-cover">
      <AuthProvider>
        <TokenRefresher />
  
        {/* Navbar fixed at the top */}
        <header className="bg-blue-600 z-1000">
           <Navbar />
        </header>
            
          
        {/* Main content area with proper padding to avoid overlap with the fixed navbar */}
        <main className="flex-grow container mt-6 mb-10 pt-16 px-6"> {/* Adjust the top margin as necessary */}
          {children}
        </main>
  
        {/* Footer at the bottom, below the content */}
        <footer className="bg-gray-800 text-white py-4">
          <Footer />
        </footer>
      </AuthProvider>
    </body>
  </html>
  

  );
}
