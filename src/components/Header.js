import React from 'react'
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {

    const { user, auth } = useAuth()

    return (
        <div id="header">
            <div className="left-container">
                <img className="profile-pic" src={user.imgUrl} />
                <h1>{user.username}</h1>
                <h2>WELCOME BACK!</h2>
            </div>
        </div>
    )
}

export default Header;