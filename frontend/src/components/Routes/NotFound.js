import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div id='main'>
        <div className='fof'>
          <h1>Erreur 404</h1>
          <p>Cette page n'existe pas !</p>
          <button className="btn-model"><Link to='/' className=" nav-link nav-link-groupomania" style={{ textDecoration: 'none' }}>Retour à l'accueil</Link></button>
        </div>
      </div>
      
    </div>
  )
}

export default NotFound
