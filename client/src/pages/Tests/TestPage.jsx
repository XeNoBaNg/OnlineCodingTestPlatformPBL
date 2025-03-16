import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import CodeEditor from "../CodeEditor"

const TestPage = () => {
    const { testId } = useParams()
    const [test, setTest] = useState(null)
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL

                const res = await axios.get(`${apiUrl}/student/tests/${testId}`)
                setTest(res.data.test)
                setQuestions(res.data.questions)
            } catch (error) {
                console.error("Error fetching test:", error.response?.data || error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTest()
    }, [testId])

    if (loading) return <p className="text-center text-gray-600 mt-10">Loading test...</p>
    if (!test) return <p className="text-center text-red-500 mt-10">Test not found.</p>

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-green-600 mb-4">{test.title}</h1>
                <p className="text-gray-700 mb-6">{test.description}</p>

                <div>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-6 p-4 border rounded-lg">
                            <h2 className="text-xl font-semibold">{question.title}</h2>
                            <p className="text-gray-600 mb-2">{question.description}</p>
                            <p className="text-sm font-semibold">
                                Difficulty:{" "}
                                <span
                                    className={`text-${
                                        question.difficulty === "Easy"
                                            ? "green"
                                            : question.difficulty === "Medium"
                                            ? "yellow"
                                            : "red"
                                    }-500`}
                                >
                                    {question.difficulty}
                                </span>
                            </p>
                            <CodeEditor />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TestPage;
