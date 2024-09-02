import React from 'react'
import { useAuth } from '../context/AuthContext';
import './Header.css';
import { useNavigate } from 'react-router-dom';


/**
 * Header component
 */
const Header = () => {
    /**
     * Get auth and navigate
     */
    const { user, logoutUser } = useAuth()
    const navigate = useNavigate();


    /**
     * Logout the user and go to login page
     */
    const handleLogout = () => { 
        const success = logoutUser();
        if (success) {
            navigate('/login');
        } 
    }

    return (
        <div id="header">
            <div className="left-container">
                <h1>{user.username}</h1>
                <h2>WELCOME BACK!</h2>
            </div>
            <div className="right-container">
                <h2>Level: {user.level}</h2>
                <h2>XP: {user.total_xp}</h2>
                <button onClick={handleLogout} className="secondary-button">LOGOUT</button>
            </div>
        </div>
    )
}

export default Header;