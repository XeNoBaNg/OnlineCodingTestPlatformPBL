import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    console.error("No token found")
                    return
                }
                const response = await axios.get('http://localhost:5000/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                })
    
                setUser(response.data) 
            } catch (error) {
                console.error("Error fetching profile:", error)
            }
        }
        fetchProfile()
    }, [])
    
    
    if (!user) return <p className="text-center mt-10 text-gray-600">Loading profile...</p>

    return (
        <div className="h-screen w-full bg-gray-100">
            <nav className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-white font-semibold hover:underline"
                >
                    Back
                </button>
            </nav>

            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl">
                    <div className="flex flex-col items-center mb-6">
                        <img 
                            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md"
                        />
                        <h2 className="mt-4 text-3xl font-semibold text-gray-800">{user.fullname}</h2>
                        <p className="text-gray-500">@{user.username}</p>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-lg space-y-3">
                        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                        <p className="text-gray-700"><strong>Reg ID:</strong> {user.regid}</p>
                        <p className="text-gray-700"><strong>Role:</strong> {user.role}</p>
                        <p className="text-gray-700"><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>

                    <div className="flex justify-center mt-6 space-x-4">
                        <button 
                            onClick={() => navigate(user.role === 'admin' ? '/admindashboard' : '/studentdashboard')} 
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
