import React from 'react';
import { Link } from 'react-router-dom';

const StudentRegister = () => {
    return (
        <div className="h-screen w-full bg-gray-100">
            {/* Navbar */}
            <nav className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
            </nav>

            {/* Register Section */}
            <section className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h1 className="text-center text-green-600 text-3xl font-bold mb-6">Student Register</h1>
                    <form className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="text"
                            placeholder="College Id Registration Number"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
                        >
                            Register
                        </button>
                    </form>
                    <div className="text-center mt-4 text-gray-500 border-t pt-4">
                        Already have an account?{' '}
                        <Link className="underline text-green-600 hover:text-green-700 font-medium" to={'/studentlogin'}>
                            Login here &raquo;
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentRegister;
