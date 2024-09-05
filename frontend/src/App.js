import './App.css';
import AuthProvider from './context/AuthContext.js';
import TaskProvider from './context/TaskContext.js';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js';
import SignupPage from './pages/SignupPage.js';
import LoginPage from './pages/LoginPage.js';

function App() {
  return (
    <>
    <TaskProvider>
    <AuthProvider>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
      </Routes>
    </AuthProvider>
    </TaskProvider>
    </>
  );
}

export default App;
