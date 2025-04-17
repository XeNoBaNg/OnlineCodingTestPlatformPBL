import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            const body = { email, password }
            const apiUrl = import.meta.env.VITE_API_URL
    
            const res = await axios.post(`${apiUrl}/admin/login`, body)
    
            if (res.data) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("adminUser", JSON.stringify(res.data))
                enqueueSnackbar("Admin Logged In Successfully!", { variant: 'success' })
                navigate('/admindashboard')
            }
        } catch (error) {
            console.error(error)
            enqueueSnackbar("Login Failed! Check your credentials.", { variant: 'error' })
        }
    }
    
    return (
        <div className="h-screen w-full bg-gray-100">
            <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
            </nav>

            <section className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h1 className="text-center text-indigo-600 text-3xl font-bold mb-6">Admin Login</h1>
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default AdminLogin
