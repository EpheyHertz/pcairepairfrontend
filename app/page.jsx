
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-transparent relative">
      
      <header className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-5xl font-bold text-white">Welcome to DocTech</h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
          Your intelligent assistant for diagnosing problems with PCs, laptops, tablets, and phones.
        </p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition duration-200">
            <Link href="/auth/signup">Get Started</Link>
        </button>
      </header>

      <section className="bg-gray-800 bg-opacity-70 p-10">
        <h2 className="text-3xl font-bold text-white text-center">Why Choose DocTech?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400">24/7 Support</h3>
            <p className="mt-2 text-gray-300">
              Our chatbot is available around the clock to assist you with any issues you face.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400">Intelligent Diagnosis</h3>
            <p className="mt-2 text-gray-300">
              Leverage AI to accurately diagnose problems in your devices with ease.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400">User-Friendly Interface</h3>
            <p className="mt-2 text-gray-300">
              Enjoy a simple and intuitive interface that makes troubleshooting a breeze.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-3xl font-bold text-white">How It Works</h2>
        <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-semibold text-blue-400">Step 1: Describe the Issue</h3>
            <p className="mt-2 text-gray-300">
              Chat with our bot and explain the problem you are facing.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-semibold text-blue-400">Step 2: Receive Diagnosis</h3>
            <p className="mt-2 text-gray-300">
              Get instant feedback and diagnostic suggestions tailored to your device.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs">
            <h3 className="text-xl font-semibold text-blue-400">Step 3: Fix the Problem</h3>
            <p className="mt-2 text-gray-300">
              Follow our guide to troubleshoot and resolve your device issues.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
    
}
