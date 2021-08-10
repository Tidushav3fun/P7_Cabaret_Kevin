import React, { useState, useEffect } from 'react'
import UploadsList from '../components/Uploads/UploadsList'
import LoginRequest from './../components/LoginRequest/LoginRequest'
import { useSelector } from 'react-redux';



const Home = () => {
  const [content, setContent] = useState('')
  const currentUser = useSelector(state => state.authReducer).user

  useEffect(() => {
    if(currentUser) {
      setContent(<UploadsList />)
    } else {
      setContent(
        <LoginRequest />
      )
    }
  }, [])

  return <div>{content}</div>
}

export default Home
