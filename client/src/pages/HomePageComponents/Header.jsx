import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
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
        </>
    )
}


export default Footer