import React, { useEffect } from 'react'
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


/**
 * The home page
 */
function HomePage () {
  /**
   * Navigate to login if we do not have auth
   */
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  })

  return (
    <>
    <Header/>
    <Tasks/>
    </>
  )
}

export default HomePage;