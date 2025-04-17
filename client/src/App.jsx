import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import StudentRegister from "./pages/Student/StudentRegister.jsx";
import StudentLogin from "./pages/Student/StudentLogin.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import TestPage from "./pages/Tests/TestPage.jsx";
import Leaderboard from "./pages/LeaderBoard.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AdminDashBoard from "./pages/Admin/AdminDashboard.jsx";
import StudentDashBoard from "./pages/Student/StudentDashBoard.jsx";
import AddTest from "./pages/Tests/AddTest.jsx";
import TestSelection from "./pages/Tests/TestSelection.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
    return ( 
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/studentregister" element={<StudentRegister />} />
                <Route path="/studentlogin" element={<StudentLogin />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/test/:testId" element={<TestPage />} />
                <Route path="/tests" element={<TestSelection />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/admindashboard" element={<AdminDashBoard />} />
                <Route path="/studentdashboard" element={<StudentDashBoard />} />
                <Route path="/admin/addtest" element={<AddTest />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    );
}

export default App;