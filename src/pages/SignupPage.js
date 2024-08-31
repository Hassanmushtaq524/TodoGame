import React, { useEffect } from 'react';
import Signup from '../components/Signup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './SignupPage.module.css';

function SignupPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  
  /**
   * Go to home if user already authenticated
   */
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [])

  return (
    <div className={styles.signupPage}>
      <Signup/>
    </div>
  )
}

export default SignupPage