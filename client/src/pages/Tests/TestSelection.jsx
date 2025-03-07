import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const TestSelection = () => {
    const [tests, setTests] = useState([])

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await axios.get("http://localhost:5000/tests")
                setTests(res.data)
            } catch (error) {
                console.error("Error fetching tests:", error)
            }
        };
        fetchTests()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Available Tests</h1>
                {tests.length === 0 ? (
                    <p className="text-gray-600">No tests available at the moment.</p>
                ) : (
                    <ul className="space-y-4">
                        {tests.map((test) => (
                            <li key={test.id} className="p-4 border rounded-lg flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{test.title}</h2>
                                    <p className="text-gray-600">{test.description}</p>
                                </div>
                                <Link
                                    to={`/test/${test.id}`}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                                >
                                    Start Test 🚀
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default TestSelection
