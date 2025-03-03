import React, { useState } from "react"
import { Link } from "react-router-dom"

const Leaderboard = () => {
    const [students] = useState([
        { id: 1, username: "Alice", total_score: 95 },
        { id: 2, username: "Bob", total_score: 88 },
        { id: 3, username: "Charlie", total_score: 82 },
        { id: 4, username: "David", total_score: 79 },
        { id: 5, username: "Eve", total_score: 75 },
    ])

    return (
        <>
            <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 fixed top-0 z-50">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
                <div className="space-x-6">
                    <Link to="/" className="text-white text-lg font-medium hover:text-gray-200 transition-all">Home</Link>
                    <Link to="/test" className="text-white text-lg font-medium hover:text-gray-200 transition-all">Test</Link>
                    <Link to="/leaderboard" className="text-yellow-300 text-lg font-semibold">
                        Leaderboard
                    </Link>
                    <Link to="/about" className="text-white text-lg font-medium hover:text-gray-200 transition-all">About</Link>
                    <Link 
                        to="/login" 
                        className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-semibold shadow-md 
                                hover:bg-gray-200 transition-all">
                        Login
                    </Link>
                </div>
            </nav>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20 px-4">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">🏆 Leaderboard</h1>

                    <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-indigo-500 text-white">
                                <th className="p-4 text-left">Rank</th>
                                <th className="p-4 text-left">Username</th>
                                <th className="p-4 text-left">Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr 
                                    key={student.id} 
                                    className={`border-t text-gray-800 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-indigo-100 transition-all`}
                                >
                                    <td className="p-4 font-semibold">{index + 1}</td>
                                    <td className="p-4">{student.username}</td>
                                    <td className="p-4 font-medium">{student.total_score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Leaderboard
