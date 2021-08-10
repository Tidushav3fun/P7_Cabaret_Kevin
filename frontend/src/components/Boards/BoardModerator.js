import React, { useState, useEffect } from 'react'
import users from '../../services/user.service'
import LoginRequest from './../LoginRequest/LoginRequest';


const BoardModerator = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    users.getModeratorBoard().then(
      response => {
        setContent(response.data)
      },
      () => {
        setContent(
          <LoginRequest/>
        )
      }
    )
  }, [])

  return (
    <div>{content}</div>
  )
}

export default BoardModerator
