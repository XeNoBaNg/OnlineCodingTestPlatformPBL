import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const adminData = localStorage.getItem("adminUser")
        const studentData = localStorage.getItem("studentUser")

        if (adminData) {
            try {
                setUser({ ...JSON.parse(adminData), role: 'admin' })
            } catch (error) {
                console.error("Error parsing admin data:", error)
                localStorage.removeItem("adminUser")
            }
        } else if (studentData) {
            try {
                setUser({ ...JSON.parse(studentData), role: 'student' })
            } catch (error) {
                console.error("Error parsing student data:", error)
                localStorage.removeItem("studentUser")
            }
        }
    }, [])

    return (
        <>
            <header className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 drop-shadow-md">
                    Skills Define You
                </h1>
                <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                    An exclusive coding platform for <b className="text-indigo-600">PICT students</b> to compete and showcase their skills when companies come for hiring.
                </p>

                <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6">
                    <Link 
                        to="/leaderboard" 
                        className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold shadow-md 
                                   hover:bg-green-700 hover:scale-105 transition-all duration-300">
                        🏆 View Leaderboard
                    </Link>
                    
                    {user?.role === 'admin' ? (
                        <Link 
                            to="/admin/addtest" 
                            className="px-8 py-4 bg-red-600 text-white rounded-xl font-semibold shadow-md 
                                       hover:bg-red-700 hover:scale-105 transition-all duration-300">
                            ➕ Add Test
                        </Link>
                    ) : user?.role === 'student' ? (
                        <Link 
                            to="/tests" 
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md 
                                       hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                            📜 Fetch Tests
                        </Link>
                    ) : null}
                </div>

                <Link 
                    to="/about" 
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-sm 
                               hover:bg-blue-600 hover:scale-105 transition-all duration-300">
                    ℹ️ Learn More
                </Link>
            </header>  
        </>
    )
}

export default Hero
