import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"

const Header = () => {
    const [user, setUser] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const adminData = localStorage.getItem("adminUser")
        const studentData = localStorage.getItem("studentUser")

        if (adminData) {
            try {
                const parsedAdmin = JSON.parse(adminData)
                console.log("Admin Data:", parsedAdmin) 
                setUser({ ...parsedAdmin, role: "admin" })
            } catch (error) {
                console.error("Error parsing admin data:", error)
                localStorage.removeItem("adminUser")
            }
        } else if (studentData) {
            try {
                const parsedStudent = JSON.parse(studentData)
                console.log("Student Data:", parsedStudent) 
                setUser({ ...parsedStudent, role: "student" })
            } catch (error) {
                console.error("Error parsing student data:", error)
                localStorage.removeItem("studentUser")
            }
        }
    }, [])

    const handleLogout = () => {
        if (user?.role === "admin") {
            localStorage.removeItem("adminUser")
        } else {
            localStorage.removeItem("studentUser")
        }
        navigate("/login")
    }

    return (
        <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 fixed top-0">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                PICT
            </Link>
            <div className="relative">
                {user ? (
                    <>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 text-white font-semibold"
                        >
                            <FaUserCircle size={28} />
                            <span>{user?.name || user?.admin?.username || "User"}</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <Link to="/login" className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition-all">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Header
