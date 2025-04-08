'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pcrepair.vercel.app';
      const response = await axios.post(`${apiUrl}/apis/password-reset/`, { email });
      alert(response.data.message);
      setEmail('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                         error.request ? 'Network Error' : 
                         error.message || 'Unknown Error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex flex-col w-full">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="px-10 pt-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-11 w-11 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DT</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">DocTech AI</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="px-10 pt-8 pb-10">
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-600 transition-colors">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-colors ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Link...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
                  Sign In
                </Link>
              </p>
              <p className="text-xs">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default PasswordResetRequest;