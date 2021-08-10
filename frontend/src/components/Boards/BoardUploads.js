import React, { useState, useEffect } from 'react'
import UserService from '../../services/user.service'
import AddUpload from './../Uploads/AddUpload'
import LoginRequest from './../LoginRequest/LoginRequest'

const BoardUploads = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    UserService.getUploadsBoard().then(
      () => {
        setContent(<AddUpload />)
      },
      () => {
        setContent(<LoginRequest />)
      }
    )
  }, [])

  return <div>{content}</div>
}

export default BoardUploads
