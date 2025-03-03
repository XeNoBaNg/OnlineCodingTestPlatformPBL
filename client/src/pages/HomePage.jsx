import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      {/* Navbar */}
      <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 fixed top-0 z-50">
        <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
          PICT
        </Link>
        <div className="space-x-6">
          <Link 
            to="/login" 
            className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-semibold shadow-md 
                       hover:bg-gray-200 transition-all">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 drop-shadow-md">
          Skills Define You
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          An exclusive coding platform for <b className="text-indigo-600">PICT students</b> to compete and showcase their skills when companies come for hiring.
        </p>
        <div className="mt-6 space-x-4">
          <Link 
            to="/test" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-lg 
                       hover:bg-indigo-700 transition-all">
            Start Test
          </Link>
          <Link 
            to="/about" 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium 
                       hover:bg-gray-300 transition-all">
            Learn More
          </Link>
          <Link 
            to="/leaderboard" 
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-lg 
                       hover:bg-green-700 transition-all">
            View Leaderboard
          </Link>
        </div>
      </header>

      {/* Footer */}
      <footer className="w-full text-center py-4 bg-gray-200 text-gray-600 text-sm border-t border-gray-300 shadow-inner">
        &copy; 2025 PICT Test Platform. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
