import React, { useEffect } from 'react';
import Login from '../components/Login';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


/**
 * The login page
 */
function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  /**
   * Go to home if user already authenticated
   */
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])


  return (
    <div className={styles.loginPage}>
        <Login/>
    </div>
  )
}

export default LoginPage