import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/app/components/Nav";
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
      <body className="min-h-screen flex flex-col bg-fixed bg-cover" >
        <AuthProvider> {/* Wrap the entire body with AuthProvider */}
          <TokenRefresher/>
          <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto py-4 px-6">
              <Nav />
            </div>
          </header>
          
          {/* Main content area, flex-grow ensures that it takes the full height available */}
          <main className="flex-grow container mx-auto py-8 px-6">
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
