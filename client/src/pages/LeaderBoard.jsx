import React, { useState } from "react";

const Leaderboard = () => {
    const [students] = useState([
        { id: 1, username: "Alice", total_score: 95 },
        { id: 2, username: "Bob", total_score: 88 },
        { id: 3, username: "Charlie", total_score: 82 },
        { id: 4, username: "David", total_score: 79 },
        { id: 5, username: "Eve", total_score: 75 },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Leaderboard</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left">Rank</th>
                            <th className="p-3 text-left">Username</th>
                            <th className="p-3 text-left">Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} className="border-t">
                                <td className="p-3 font-semibold">{index + 1}</td>
                                <td className="p-3">{student.username}</td>
                                <td className="p-3">{student.total_score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
