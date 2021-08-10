import React from 'react'

import { Link } from 'react-router-dom'

const LoginRequest = () => {


  return (
    <div className='container'>
      <div className='left'>
        <div className='header'>
          <h2 className='animation a1'>
            Vous devez vous connecter pour accéder à ce contenu !
          </h2>
          <h4 className='animation a2'>
            Rendez-vous sur la page de connexion.
          </h4>
        </div>
        <button className='animation a5 btn-model' disabled={false}>
          {false && (
            <span className='spinner-border spinner-border-sm'></span>
          )}
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <span style={{ color: 'white' }}>Se connecter</span>
          </Link>
        </button>
      </div>
      <div className='right-login-request'></div>
    </div>
  )
}

export default LoginRequest
