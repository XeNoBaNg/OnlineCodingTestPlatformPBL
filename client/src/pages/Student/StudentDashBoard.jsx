import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"

const StudentDashboard = () => {
    const [student, setStudent] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const studentData = localStorage.getItem("studentUser")
        if (studentData) {
            try {
                const parsedData = JSON.parse(studentData)
                setStudent(parsedData)
            } catch (error) {
                console.error("Error parsing student data:", error)
                localStorage.removeItem("studentUser")
            }
        } else {
            console.warn("No student data found in localStorage")
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("studentUser")
        navigate("/login")
    }

    return (
        <div className="h-screen w-full bg-gray-100">
            <nav className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
                {student ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 text-white font-semibold"
                        >
                            <FaUserCircle size={28} />
                            <span>{student?.name || "Student"}</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="text-white font-semibold">
                        Login
                    </Link>
                )}
            </nav>

            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl text-gray-600 p-10">STUDENT DASHBOARD</h1>

                {student && (
                    <button
                        onClick={() => navigate("/tests")}
                        className="mt-6 px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        📜 Fetch Tests
                    </button>
                )}
            </div>
        </div>
    )
}

export default StudentDashboard
