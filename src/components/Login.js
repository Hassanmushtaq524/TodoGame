import React, { useRef, useState } from 'react';
import styles from './Login.module.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * The login form
 */
function Login() {
  /**
   * Use the loginRef to get input values and send to context
   */
  const loginRef = useRef(null);
  const { loginUser } = useAuth();
  const [ error, setError ] = useState(false);
  const navigate = useNavigate();


  /**
   * Send the login info to the backend API
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginRef.current.username.value || !loginRef.current.password.value) {
      setError(true);
      return;
    } 

    /**
     * Send the info
     */
    const userInfo = {
      username: loginRef.current.username.value,
      password: loginRef.current.password.value
    }

    const success = await loginUser(userInfo);
    if (success) {
      setError(false);
      navigate('/');
    } else {
      setError(true);
    }
  }

  return (
    <form ref={loginRef} className={styles.loginForm} onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <div className={styles.formInput}>
            <label htmlFor="username">Email</label>
            <input type="username" name="username" placeholder="Enter Username" />
        </div>
        <div className={styles.formInput}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter Password" />
        </div>
        { error && <p style={{color: 'red'}}>Incorrect email/password</p>}
        <button className={styles.submitButton}>LOGIN</button>
    </form>
  )
}

export default Login;