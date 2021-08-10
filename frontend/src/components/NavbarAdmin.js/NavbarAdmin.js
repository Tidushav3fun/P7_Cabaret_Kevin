import React from 'react'

import AdminUsersList from './../Admin/AdminUsersList'
import AdminUploadsList from './../Admin/AdminUploadsList'

const NavbarAdmin = () => {
  return (
    <div className='container-fluid '>
      <div className='row'>
        <div className='col mb-2'>
          <div className='card'>
            <h5 className='card-header'>Gestion des posts</h5>
            <div className='card-body'>
              <AdminUploadsList />
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card'>
            <h5 className='card-header'>Gestion des utilisateurs</h5>
            <div className='card-body'>
              <AdminUsersList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin
