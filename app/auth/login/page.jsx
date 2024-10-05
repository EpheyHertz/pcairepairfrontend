'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext'; // Adjusted path
// import { access } from 'fs';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter()
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Simulate an API call for login
    try {
      // Replace this with your actual login logic
      const response = await fetch('/apis/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
    //   console.log(data)

      if (response.ok) {
        // Store tokens in local storage
        const tokens={access: data.access,refresh: data.refresh}
        // localStorage.setItem('accessToken', data.access);
        // localStorage.setItem('refreshToken', data.refresh);
        
        setSuccess(data.message);
        setEmail('')
        setPassword('')
        login(tokens);// Set isAuthenticated to true
        

        // Redirect or perform any additional logic
      } else {
        setError(data.message || 'Login failed, please try again.');
      }
    } catch (error) {
      setError('Login failed, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative flex items-center justify-center align-middle mb-10 mt-30 rounded-3xl "style={{ backgroundImage: 'url("../images/signuplogin.png")' }}>
      <div className="absolute inset-0 bg-cover bg-center rounded-3xl align-middle " >
        <div className="bg-black bg-opacity-50 h-full w-full" /> {/* Overlay for readability */}
      </div>

      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white text-center">Log In</h2>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-500 text-center">{success}</div>}

        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-200" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-200" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {isPasswordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a7 7 0 00-5.937 11.012l-.846.846A1 1 0 002 16.162l2.085-2.085A8.962 8.962 0 0110 18a8.962 8.962 0 015.937-2.922l2.085 2.085a1 1 0 001.415-1.415l-.846-.846A7 7 0 0010 3z" /><path d="M10 8a2 2 0 100 4 2 2 0 000-4z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a7 7 0 00-5.937 11.012l-.846.846A1 1 0 002 16.162l2.085-2.085A8.962 8.962 0 0110 18a8.962 8.962 0 015.937-2.922l2.085 2.085a1 1 0 001.415-1.415l-.846-.846A7 7 0 0010 3z" /><path d="M10 8a2 2 0 100 4 2 2 0 000-4z" /></svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 rounded-md text-white ${isSubmitting ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'} transition duration-200`}
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-300">
          <p>
            Forgot your password?{' '}
            <Link href="/auth/password-reset" className="text-blue-400 hover:underline">Reset Password</Link>
          </p>
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-400 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
