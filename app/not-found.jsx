import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-blue-50 to-blue-100 rounded-3xl">
      <img src="/images/img2.jpg" alt="404 Not Found" className="w-1/2 mb-8 rounded-lg shadow-lg" />
      <h1 className="text-8xl font-extrabold text-blue-700">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800">Oops! Page not found</h2>
      <p className="mt-3 max-w-md mx-auto text-lg text-gray-600">
        Sorry, the page you are looking for does not exist. It might have been removed, or you may have entered the wrong URL.
      </p>
      <div className="mt-8 space-x-4">
        <Link 
          href="/" 
          className="inline-block px-8 py-4 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Go back to Home
        </Link>
        <Link 
          href="https://epheyhertz.github.io/doctechprivacyandterms/"
          className="inline-block px-8 py-4 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
