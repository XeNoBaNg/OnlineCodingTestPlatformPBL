import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
    const [code, setCode] = useState("// Write your code here...");
    const [language, setLanguage] = useState("javascript");
    const [output, setOutput] = useState("");

    const handleSubmit = () => {
        setOutput("Code submitted successfully (dummy output).");
    };

    return (
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

            <button
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                Submit
            </button>

            {output && (
                <div className="mt-4 p-3 bg-gray-100 rounded-md">
                    <strong>Output:</strong> {output}
                </div>
            )}
        </div>
    );
};

export default CodeEditor;
