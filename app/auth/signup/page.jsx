'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

const SignupPage = () => {
  const router = useRouter();
const [formData, setFormData] = useState({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
});
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState('');
const [agreeToTerms, setAgreeToTerms] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'username') {
    setFormData(prev => ({
      ...prev,
      [name]: value.replace(/\s+/g, '') // Remove spaces from username
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!agreeToTerms) {
    return setError('Please accept the terms & conditions and privacy policy');
  }

  if (formData.password.length < 8) {
    return setError('Password must be at least 8 characters');
  }

  if (formData.password !== formData.confirmPassword) {
    return setError('Passwords do not match');
  }

  setIsSubmitting(true);

  try {
    const { email, username, password } = formData;
    const response = await fetch('/apis/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    console.log("Response:",response)

    if (response.ok) {
      alert("Please check your email for verification");
      router.push('/auth/login');
      setFormData({ email: '', username: '', password: '', confirmPassword: '' });
    } else {
      setError(response.message||'Signup failed. Please try again.');
    }
  } catch (err) {
    console.error(err);
    setError(err ||'Signup failed. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-2/5 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Start Your Tech Journey
            </h1>
            <p className="text-gray-600">
              Join DocTech AI for expert PC repair solutions
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-600 transition-colors">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="relative">
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-600 transition-colors">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username (no spaces)"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-600 transition-colors">
                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="ml-3 text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="flex items-center border-b-2 border-gray-200 focus-within:border-blue-600 transition-colors">
                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start mt-6">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-colors ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Get Started Now'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-3/5 bg-gray-100 hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-blue-600/30" />
          <img
            src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop"
            alt="PC Repair Technician working on computer hardware"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-xl font-bold mb-2">Expert PC Repair Solutions</h3>
            <p className="text-blue-100">Join thousands of satisfied customers who trust our technicians</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;