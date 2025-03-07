import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashBoard = () => {
    return (
        <>
            <div className='h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col'>
                <header className="flex-grow flex flex-col justify-center items-center text-center px-4">
                    <h1 className='text-4xl text-gray-500 p-10'>ADMIN DASHBOARD</h1>
                    <Link 
                        to="/admin/addtest" 
                        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-md 
                                    hover:bg-indigo-700 hover:scale-105 transition-all duration-300">
                        Add Test
                    </Link>
                </header> 
            </div>
        </>
    )
}

export default AdminDashBoard