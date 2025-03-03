import React from "react"
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import LoginRegister from "./pages/LoginRegister.jsx"
import StudentRegister from "./pages/Student/StudentRegister.jsx"
import StudentLogin from "./pages/Student/StudentLogin.jsx"
import AdminLogin from "./pages/Admin/AdminLogin.jsx"
import TestPage from "./pages/Tests/TestPage.jsx"
import Leaderboard from "./pages/LeaderBoard.jsx"

function App() {
    return ( 
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/studentregister" element={<StudentRegister />} />
                <Route path="/studentlogin" element={<StudentLogin />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="leaderboard" element={<Leaderboard />} />
            </Routes>
        </>
    );
}

export default App
