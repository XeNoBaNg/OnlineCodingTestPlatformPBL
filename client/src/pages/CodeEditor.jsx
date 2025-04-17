import { useState, useEffect } from "react"
import axios from "axios"
import Editor from "@monaco-editor/react"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

const CodeEditor = ({ user_id, question_id, test_id }) => {
    const [code, setCode] = useState("")
    const [language, setLanguage] = useState("javascript")
    const [output, setOutput] = useState("")
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        const savedCode = localStorage.getItem(`code_${question_id}`)
        if (savedCode) setCode(savedCode)
    }, [question_id])

    useEffect(() => {
        localStorage.setItem(`code_${question_id}`, code)
    }, [code, question_id])

    const handleSubmit = async () => {
        if (!user_id) {
            enqueueSnackbar("User not found! Please log in again.", { variant: "error" })
            return
        }
    
        setLoading(true)
        try {
            const body = { user_id, question_id, language, code }
            const res = await axios.post(`${apiUrl}/submit`, body)
    
            console.log("Submission Response:", res.data)

            if (res.data.status === "Accepted") {
                enqueueSnackbar(`Status: ${res.data.status}`, { variant: "success" })
            } else {
                enqueueSnackbar(`Status: ${res.data.status}`, { variant: "error" })
            }

            if (res.data.status === "Compilation Error" && res.data.error_message) {
                setOutput(`Error: ${res.data.error_message}`)
            } else {
                setOutput(`Score: ${res.data.score}\nTime: ${res.data.execution_time}s\nMemory: ${res.data.memory_used}KB`)
            }
        } catch (error) {
            console.error("Submission error:", error.response?.data || error.message)
            enqueueSnackbar("Submission Failed!", { variant: "error" })
        } finally {
            setLoading(false)
        }
    }
    

    const handleTestSubmit = () => {
        enqueueSnackbar("Test submitted successfully", { variant: "success" })
        navigate("/leaderboard")
    }

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Language</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                </select>

                <Editor
                    height="300px"
                    theme="vs-dark"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value)}
                />

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSubmit}
                        className={`px-4 py-2 rounded-md ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>

                {output && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-md">
                        <strong>Result:</strong>
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleTestSubmit}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg shadow-md"
                >
                    Submit Test
                </button>
            </div>
        </>
    )
}

export default CodeEditor
