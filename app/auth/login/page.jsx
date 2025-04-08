'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const router = useRouter();
  const { login } = useAuth();

  // Array of background images
  const backgroundImages = [
    'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop',  // Computer repair
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop',     // PC components
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop',  // Circuit board repair
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop',  // PC motherboard
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop',     // AI visualization
    'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop',  // Computer diagnostics
    'https://images.unsplash.com/photo-1581092921461-7d1de57e786e?auto=format&fit=crop'   // Tech support concept
  ];
  const length=backgroundImages.length;

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/apis/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const tokens = {access: data.access, refresh: data.refresh};
        setSuccess(data.message || 'Login successful!');
        setEmail('');
        setPassword('');
        login(tokens);
      } else {
        setError(data.message || 'Login failed, please try again.');
      }
    } catch (error) {
      setError(err||'Login failed, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br overflow-hidden">
      {/* Background with animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center"
          style={{ 
            backgroundImage: `url("${backgroundImages[currentBgIndex]}")`,
            opacity: 0.6
          }}
        />
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 left-1/4 w-1/5 h-1/5 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/4 h-1/4 bg-red-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl relative z-10 overflow-hidden rounded-2xl shadow-2xl">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 bg-opacity-95 p-8 md:p-12">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-400 to-blue-500 text-white text-3xl font-bold w-12 h-12 rounded-lg flex items-center justify-center mr-3">D</div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">DocTech</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Log in to your account to continue</p>
          </div>

          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">{error}</div>}
          {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">{success}</div>}

          <div className="mb-6">
            <button className="w-full flex justify-center items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign in with Google
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">Or continue with email</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@company.com"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                <Link href="/auth/password-reset" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
                isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
              }`}
            >
              {isSubmitting ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Sign Up</Link>
            </p>
            <p className="mt-4">
              By continuing, you agree to our{' '}
              <Link href="https://doctechprivacyandterms.vercel.app/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service and Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-6">DocTech AI</h2>
              <p className="text-xl mb-2">PC Repair Platform</p>
              <p className="text-lg font-light opacity-90">Changing the way the world writes and fixes computers</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">AI-powered diagnostics</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Expert technician support</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm">Fast repair solutions</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;