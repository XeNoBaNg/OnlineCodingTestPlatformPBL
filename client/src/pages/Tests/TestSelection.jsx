import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaUserCircle } from "react-icons/fa"

const TestSelection = () => {
  const [tests, setTests] = useState([])
  const [student, setStudent] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const studentData = localStorage.getItem("studentUser")
    if (studentData) {
      try {
        setStudent(JSON.parse(studentData))
      } catch (error) {
        console.error("Error parsing student data:", error)
        localStorage.removeItem("studentUser")
      }
    }

    const fetchTests = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await axios.get(`${apiUrl}/tests`)
        setTests(res.data)
      } catch (error) {
        console.error("Error fetching tests:", error)
      }
    }

    fetchTests()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("studentUser")
    navigate("/login")
  }

  const categorizeTests = (tests) => {
    const now = new Date()
    const upcoming = []
    const live = []
    const completed = []

    tests.forEach(test => {
      const startTime = new Date(test.start_time)
      const endTime = new Date(test.end_time)

      if (now < startTime) {
        upcoming.push(test)
      } else if (now >= startTime && now <= endTime) {
        live.push(test)
      } else {
        completed.push(test)
      }
    })

    return { upcoming, live, completed }
  }

  const { upcoming, live, completed } = categorizeTests(tests)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 shadow-md flex items-center justify-between px-10 fixed top-0">
        <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
          PICT
        </Link>
        {student ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white font-semibold"
            >
              <FaUserCircle size={28} />
              <span>{student?.name || "Student"}</span>
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
          <Link to="/login" className="text-white font-semibold">
            Login
          </Link>
        )}
      </nav>

      <div className="pt-20 p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Available Tests</h1>

          {['Live Tests', 'Upcoming Tests', 'Completed Tests'].map((category, idx) => {
            const testGroup = [live, upcoming, completed][idx]
            return (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-semibold text-green-700 mb-2">{category}</h2>
                {testGroup.length === 0 ? (
                  <p className="text-gray-500">No {category.toLowerCase()} available.</p>
                ) : (
                  <ul className="space-y-4">
                    {testGroup.map(test => (
                      <li key={test.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold">{test.title}</h3>
                          <p className="text-gray-600">{test.description}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Starts: {new Date(test.start_time).toLocaleString()}<br />
                            Ends: {new Date(test.end_time).toLocaleString()}
                          </p>
                        </div>
                        {category === 'Live Tests' && (
                          <Link
                            to={`/test/${test.id}`}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                          >
                            Start Test 🚀
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TestSelection
