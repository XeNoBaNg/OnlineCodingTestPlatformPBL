import React, { useState } from "react";
import CodeEditor from "../CodeEditor";

const TestPage = () => {
    const [test] = useState({
        title: "Sample Test",
        description: "This is a sample test description.",
    });

    const [questions] = useState([
        {
            id: 1,
            title: "Reverse a String",
            description: "Write a function to reverse a given string.",
            difficulty: "Easy",
        },
        {
            id: 2,
            title: "Find the Largest Number",
            description: "Write a function to find the largest number in an array.",
            difficulty: "Medium",
        },
    ]);

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
    );
};

export default TestPage;
