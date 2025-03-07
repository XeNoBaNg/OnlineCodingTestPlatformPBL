import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentRegister = () => {
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        reg_id: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        setFormData((prev) => {
            const newFormData = { ...prev, [e.target.name]: e.target.value };
            return newFormData;
        });
    }

    const sendRegisterInfo = async (event) => {
        event.preventDefault();
        try {
            const resp = await axios.post(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/register`, formData);
            console.log(resp.data);
            nav('/studentlogin');
        } catch (error) {
            console.log('Error:', error.response.status, "::", error.response.data);
        }
    };
    

    return (
        <div className="h-screen w-full bg-gray-100">
            <nav className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                <Link
                    to="/"
                    className="text-3xl font-extrabold text-white tracking-wide"
                >
                    PICT
                </Link>
            </nav>

            <section className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h1 className="text-center text-green-600 text-3xl font-bold mb-6">
                        Student Register
                    </h1>
                    <form
                        className="flex flex-col space-y-4"
                        onSubmit={sendRegisterInfo}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={formData.name}
                            required
                        />
                        <input
                            type="text"
                            name="reg_id"
                            placeholder="College Id Registration Number"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={formData.reg_id}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            name="email"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={formData.email}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            autoComplete="new-password"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={formData.password}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
                        >
                            Register
                        </button>
                    </form>
                    <div className="text-center mt-4 text-gray-500 border-t pt-4">
                        Already have an account?{" "}
                        <Link
                            className="underline text-green-600 hover:text-green-700 font-medium"
                            to={"/studentlogin"}
                        >
                            Login here &raquo;
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentRegister;
