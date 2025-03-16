import React from 'react'
import { Link } from 'react-router-dom'

const StudentDashBoard = () => {
    return (
        <>
            <div className="h-screen w-full bg-gray-100">
                <nav className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                    <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                        PICT
                    </Link>
                </nav>

                <div>
                    <div className='h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col'>
                        <header className="flex-grow flex flex-col justify-center items-center text-center px-4">
                            <h1 className='text-4xl text-gray-500 p-10'>STUDENT DASHBOARD</h1>
                        </header> 
                    </div>   
                </div>
            </div>
        </>
    )
}

export default StudentDashBoard