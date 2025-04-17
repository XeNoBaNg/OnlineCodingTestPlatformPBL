import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tests, setTests] = useState([]);
    const [selectedTestId, setSelectedTestId] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const user = JSON.parse(localStorage.getItem("studentUser"));

    const handleLogout = () => {
        localStorage.removeItem("studentUser");
        enqueueSnackbar("Logged out successfully", { variant: "success" });
        navigate("/login");
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const testIdParam = searchParams.get("testId");
        if (testIdParam) {
            setSelectedTestId(testIdParam);
        }

        const fetchTests = async () => {
            try {
                const response = await axios.get(`${apiUrl}/tests`);
                setTests(response.data);
            } catch (error) {
                console.error("Error fetching tests:", error);
                enqueueSnackbar("Failed to load tests", { variant: "error" });
            }
        };

        fetchTests();
    }, [location.search, apiUrl, enqueueSnackbar]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setLoading(true);
            try {
                const endpoint = selectedTestId
                    ? `${apiUrl}/leaderboard/${selectedTestId}`
                    : `${apiUrl}/leaderboard`;

                const response = await axios.get(endpoint);
                setLeaderboardData(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
                enqueueSnackbar("Failed to load leaderboard", { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, [selectedTestId, apiUrl, enqueueSnackbar]);

    const handleTestChange = (e) => {
        setSelectedTestId(e.target.value);
    };

    return (
        <>
            <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 fixed top-0 z-50">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
                <div className="space-x-6 flex items-center relative">
                    <Link to="/" className="text-white text-lg font-medium hover:text-gray-200 transition-all">Home</Link>
                    <Link to="/tests" className="text-white text-lg font-medium hover:text-gray-200 transition-all">Tests</Link>
                    <Link to="/leaderboard" className="text-yellow-300 text-lg font-semibold">Leaderboard</Link>
                    <Link to="/about" className="text-white text-lg font-medium hover:text-gray-200 transition-all">About</Link>

                    {user ? (
                        <div className="relative text-white text-md font-medium cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            👤 {user.name || "Student"}

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
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
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition-all"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20 px-4">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">🏆 Leaderboard</h1>

                    <div className="mb-6">
                        <label htmlFor="test-select" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Test
                        </label>
                        <select
                            id="test-select"
                            value={selectedTestId}
                            onChange={handleTestChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">All Tests (Overall Ranking)</option>
                            {tests.map(test => (
                                <option key={test.id} value={test.id}>
                                    {test.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : (
                        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-500 text-white">
                                    <th className="p-4 text-left">Rank</th>
                                    <th className="p-4 text-left">Username</th>
                                    <th className="p-4 text-left">Registration ID</th>
                                    <th className="p-4 text-left">Total Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.length > 0 ? (
                                    leaderboardData.map((student, index) => (
                                        <tr
                                            key={student.id}
                                            className={`border-t text-gray-800 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-indigo-100 transition-all`}
                                        >
                                            <td className="p-4 font-semibold">{index + 1}</td>
                                            <td className="p-4">{student.username}</td>
                                            <td className="p-4">{student.regid}</td>
                                            <td className="p-4 font-medium">{student.total_score}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-6 text-center text-gray-500">
                                            No data available for this test yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Leaderboard;
