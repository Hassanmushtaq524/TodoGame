import React, { useRef, useState } from 'react'
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Signup() {
    const signupRef = useRef();
    const { signupUser } = useAuth();
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signupRef.current.username.value || !signupRef.current.password.value || !signupRef.current.email.value) {
            setError(true);
            return;
        } 
    
        /**
         * Send the info
         */
        const userInfo = {
            email: signupRef.current.email.value,
            username: signupRef.current.username.value,
            password: signupRef.current.password.value
        }
    
        const success = await signupUser(userInfo);
        if (success) {
            setError(false);
            navigate('/');
        } else {
            setError(true);
        }
    }

    const handleClickLogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    return (
        <form ref={signupRef} className={styles.signupForm} onSubmit={handleSubmit}>
            <h1>SIGNUP</h1>
            <div className={styles.formInput}>
                <label htmlFor="username">Username</label>
                <input type="username" name="username" placeholder="Enter Username" />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter Email" />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter Password" />
            </div>
            { error && <p style={{color: 'red'}}>Signing up not successful</p>}
            <button className="primary-button" onClick={handleSubmit}>SIGNUP</button>
            <button className="secondary-button" onClick={handleClickLogin}>LOGIN</button>
        </form>
    )
}

export default Signup