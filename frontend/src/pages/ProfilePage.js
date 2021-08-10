import React, { useState, useEffect } from 'react'

import LoginRequest from './../components/LoginRequest/LoginRequest';
import Profile from '../components/Profile/Profile';
import { useSelector } from 'react-redux';


const ProfilePage = () => {
  const [content, setContent] = useState('')
  const currentUser = useSelector(state => state.authReducer).user


  useEffect(() => {
    if(currentUser) {
      setContent(<Profile />)
    } else {
      setContent(
        <LoginRequest />
      )
    }
  }, [])

  return (
    <div>{content}</div>
  )
}

export default ProfilePage
