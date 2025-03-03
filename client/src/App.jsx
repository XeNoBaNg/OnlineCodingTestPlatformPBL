import React from "react"
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import Login_Register from "./pages/Login_Register.jsx"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login_Register />} />
            </Routes>
        </>
    );
}

export default App
