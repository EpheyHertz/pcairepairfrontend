import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <img 
        src="/images/img2.jpg" 
        alt="404 Not Found" 
        className="w-3/5 max-w-lg mb-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <h1 className="text-9xl font-extrabold text-blue-700 mb-4 drop-shadow-md">404</h1>
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Oops! Page not found
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Sorry, the page you are looking for does not exist. It might have been removed, or you may have entered the wrong URL. If the problem persists, contact us below.
      </p>
      <div className="mt-10 flex flex-wrap justify-center space-x-4">
        <Link 
          href="/" 
          className="px-8 py-4 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
        >
          Go Back to Home
        </Link>
        <Link 
          href="https://epheyhertz.github.io/doctechprivacyandterms/"
          className="px-8 py-4 text-blue-600 border border-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
