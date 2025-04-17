import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from "notistack"

const AddTest = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [questions, setQuestions] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    
    const addQuestion = () => {
        setQuestions([...questions, { title: "", description: "", difficulty: "Easy", test_cases: "", max_score: "" }])
    }

    const updateQuestion = (index, field, value) => {
        const updatedQuestions = [...questions]
        updatedQuestions[index][field] = value
        setQuestions(updatedQuestions)
    }

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index))
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        if (!title || !description || !startTime || !endTime || questions.length === 0) {
            enqueueSnackbar("Please fill all fields and add at least one question!", { variant: "warning" })
            return
        }

        try {
            const body = { title, description, start_time: startTime, end_time: endTime, questions }
            const apiUrl = import.meta.env.VITE_API_URL

            await axios.post(`${apiUrl}/admin/addtest`, body)

            enqueueSnackbar("Test added successfully!", { variant: "success" })

            setTitle("")
            setDescription("")
            setStartTime("")
            setEndTime("")
            setQuestions([])

            navigate('/tests')

        } catch (error) {
            console.error("Error:", error.response?.data || error.message)
            enqueueSnackbar(error.response?.data?.message || "Failed to add test", { variant: "error" })
        }
    }

    return (
        <div className="h-screen w-full bg-gray-100">
            <nav className="w-full h-16 bg-gradient-to-r from-green-600 to-green-500 shadow-md flex items-center justify-between px-10 fixed top-0">
                <Link to="/" className="text-3xl font-extrabold text-white tracking-wide">
                    PICT
                </Link>
            </nav>

            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
                    <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Add New Test</h1>
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Test Title" value={title} onChange={(ev) => setTitle(ev.target.value)} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400" required />
                        <textarea placeholder="Test Description" value={description} onChange={(ev) => setDescription(ev.target.value)} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400" required></textarea>
                        <input type="datetime-local" value={startTime} onChange={(ev) => setStartTime(ev.target.value)} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400" required />
                        <input type="datetime-local" value={endTime} onChange={(ev) => setEndTime(ev.target.value)} className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400" required />
                        
                        <h2 className="text-xl font-semibold text-gray-700">Questions</h2>
                        {questions.map((q, index) => (
                            <div key={index} className="p-4 border rounded-md space-y-2 bg-gray-50">
                                <input type="text" placeholder="Question Title" value={q.title} onChange={(ev) => updateQuestion(index, "title", ev.target.value)} className="p-2 border rounded-md w-full" required />
                                <textarea placeholder="Question Description" value={q.description} onChange={(ev) => updateQuestion(index, "description", ev.target.value)} className="p-2 border rounded-md w-full" required></textarea>
                                <select value={q.difficulty} onChange={(ev) => updateQuestion(index, "difficulty", ev.target.value)} className="p-2 border rounded-md w-full">
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                <input type="text" placeholder='Test Cases (JSON)' value={q.test_cases} onChange={(ev) => updateQuestion(index, "test_cases", ev.target.value)} className="p-2 border rounded-md w-full" required />
                                <input type="number" placeholder='Max Score' value={q.max_score} onChange={(ev) => updateQuestion(index, "max_score", ev.target.value)} className="p-2 border rounded-md w-full" required />
                                <button type="button" onClick={() => removeQuestion(index)} className="text-red-600 text-sm">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addQuestion} className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">Add Question</button>
                        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition">Add Test</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTest