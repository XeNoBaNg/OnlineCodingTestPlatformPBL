import React, { useState } from 'react'
import axios from "axios"
import { useSnackbar } from "notistack"

const AddTest = () => {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        if (!title || !description || !startTime || !endTime) {
            enqueueSnackbar("Please fill all fields!", { variant: "warning" })
            return
        }

        try {
            const body = { title, description, start_time: startTime, end_time: endTime }
            const res = await axios.post("http://localhost:5000/admin/addtest", body)

            enqueueSnackbar("Test added successfully!", { variant: "success" })

            setTitle("")
            setDescription("")
            setStartTime("")
            setEndTime("")
        } catch (error) {
            console.error("Error:", error.response?.data || error.message)
            enqueueSnackbar(error.response?.data?.message || "Failed to add test", { variant: "error" })
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Add New Test</h1>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Test Title"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                        className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <textarea
                        placeholder="Test Description"
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                        className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                        required
                    ></textarea>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(ev) => setStartTime(ev.target.value)}
                        className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(ev) => setEndTime(ev.target.value)}
                        className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
                    >
                        Add Test
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTest