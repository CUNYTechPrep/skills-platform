import "./App.css";

import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Activities from "./pages/Activities";
import Quizzes from "./pages/Quizzes";
import LeetcodeQuizzes from "./pages/LeetcodeQuizzes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/leetcode-quizzes" element={<LeetcodeQuizzes />} />
      </Routes>
    </Router>
  );
}

export default App;
