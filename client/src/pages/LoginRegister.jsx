import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegister = () => {
    return (
        <div className="h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200">
            {/* Navbar */}
            <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 fixed top-0 z-50">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
            </nav>

            {/* Login Sections */}
            <div className="h-screen w-full flex pt-16">
                {/* Admin Section */}
                <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50 border-r border-gray-300">
                    <div className="w-2/3 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">For Admins</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Manage coding tests, evaluate student performance, and define passing criteria.
                            Ensure a fair and challenging experience while tracking real-time results.
                        </p>
                        <Link to="/adminlogin">
                            <button className="w-40 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md 
                                               hover:bg-indigo-700 transition-all">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Student Section */}
                <div className="w-1/2 flex flex-col justify-center items-center bg-white">
                    <div className="w-2/3 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">For Students</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Take coding tests, compete on the leaderboard, and prove your skills.
                            Score above the passing criteria to advance and achieve top rankings.
                        </p>
                        <Link to="/studentlogin">
                            <button className="w-40 border-2 border-gray-700 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow-md 
                                               hover:bg-gray-700 hover:text-white transition-all">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
