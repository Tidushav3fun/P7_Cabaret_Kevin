import React, { useState, useEffect } from 'react'
import UserService from '../../services/user.service'

import NavbarAdmin from './../NavbarAdmin.js/NavbarAdmin'
import LoginRequest from './../LoginRequest/LoginRequest'

const BoardAdmin = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    UserService.getAdminBoard().then(
      () => {
        setContent(<NavbarAdmin />)
      },
      () => {
        setContent(<LoginRequest />)
      }
    )
  }, [])

  return <div>{content}</div>
}

export default BoardAdmin
