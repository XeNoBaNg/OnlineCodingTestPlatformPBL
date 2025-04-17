import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaUserCircle } from "react-icons/fa"

const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAdminProfile = async () => {
            const token = localStorage.getItem("token")
            if (!token) return

            try {
                const response = await axios.get("http://localhost:5000/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                })

                if (response.data.role === "admin") {
                    setAdmin(response.data)
                } else {
                    navigate("/") 
                }
            } catch (error) {
                console.error("Error fetching admin profile:", error)
                navigate("/")
            }
        }
        fetchAdminProfile()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="h-screen w-full bg-gray-100">
            <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
                {admin ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 text-white font-semibold"
                        >
                            <FaUserCircle size={28} />
                            <span>{admin.username}</span>
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
                    <Link to="/adminlogin" className="text-white font-semibold">
                        Login
                    </Link>
                )}
            </nav>

            <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
                <h1 className="text-4xl text-gray-600 font-bold">ADMIN DASHBOARD</h1>
                <button
                    onClick={() => navigate("/admin/addtest")}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                    ➕ Add Test
                </button>
            </div>
        </div>
    )
}

export default AdminDashboard
