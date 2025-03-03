import React from 'react'

const Login_Register = () => {
    return (
        <div className="h-screen w-full bg-gray-100">
            <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-10 fixed top-0">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
                    PICT
                </h1>
                
                <div className="space-x-4">
                    <button className="px-4 py-2 text-gray-700 border-2 border-gray-700 rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:text-white">
                        Login
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700">
                        Sign Up
                    </button>
                </div>
            </nav>

            <div className="h-screen w-full flex pt-16">
                <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50 border-r border-gray-300">
                    <div className="w-2/3 text-center">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">For Admins</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Manage coding tests, evaluate student performance, and define passing criteria. 
                            Ensure a fair and challenging experience while tracking real-time results.
                        </p>
                        <button className="w-40 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700">
                            Login
                        </button>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col justify-center items-center bg-white">
                    <div className="w-2/3 text-center">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">For Students</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Take coding tests, compete on the leaderboard, and prove your skills. 
                            Score above the passing criteria to advance and achieve top rankings.
                        </p>
                        <button className="w-40 border-2 border-gray-700 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:text-white">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login_Register
