import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AboutPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("studentUser"))
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("studentUser")
    setIsDropdownOpen(false)
    navigate("/login")
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md flex items-center justify-between px-10 relative">
        <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
          PICT
        </Link>
        <div className="space-x-6 flex items-center relative">
          <Link to="/" className="text-white text-lg font-medium hover:text-gray-200 transition-all">Home</Link>
          <Link to="/tests" className="text-white text-lg font-medium hover:text-gray-200 transition-all">Tests</Link>
          <Link to="/leaderboard" className="text-white text-lg font-medium hover:text-gray-200 transition-all">Leaderboard</Link>
          <Link to="/about" className="text-yellow-300 text-lg font-semibold">About</Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="text-white text-md font-medium focus:outline-none"
              >
                👤 {user.name || "Student"}
              </button>

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

      <div className="flex-grow flex flex-col justify-center items-center text-center px-6 pt-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-md">
          About Our Platform
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl">
          PICT Test Platform is an exclusive coding environment designed for students to{" "}
          <strong>compete, improve skills, and get noticed by recruiters</strong>. It provides a structured{" "}
          platform to practice coding and participate in timed tests.
        </p>

        <div className="mt-8 space-y-6 max-w-4xl text-left mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-600">For Admins</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>Create and manage coding tests.</li>
              <li>Set start & end times for tests.</li>
              <li>Add test cases for each question.</li>
              <li>View student submissions & results.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-600">For Students</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>Attempt coding tests during scheduled times.</li>
              <li>Submit solutions and get instant feedback.</li>
              <li>View past test performance & track progress.</li>
              <li>Compete for a top rank on the leaderboard.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-600">Scoring & Leaderboard</h3>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
              <li>Automatic test case validation & scoring.</li>
              <li>Leaderboard ranks students based on total scores.</li>
              <li>Top students get highlighted for recruiters.</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="w-full text-center py-4 bg-gray-200 text-gray-600 text-sm border-t border-gray-300 shadow-inner">
        &copy; 2025 PICT Test Platform. All Rights Reserved.
      </footer>
    </div>
  )
}

export default AboutPage
