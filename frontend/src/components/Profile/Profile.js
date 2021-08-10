import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import UploadsDataServices from '../../services/upload.service'
import UserService from '../../services/user.service'
import jwt_decode from 'jwt-decode'
import EditProfile from './EditProfile'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const decodedUser = jwt_decode(user.accessToken)

  const [currentUser, setCurrentUser] = useState(decodedUser)
  const [yourUploads, setYourUploads] = useState([])
  const [comments, setComments] = useState([])
  const [editMode, setEditMode] = useState(false)

  const changeToFalse = () => {
    setEditMode(false)
    retrieveUser()
  }

  const retrieveUser = () => {
    UserService.getUser(currentUser.id).then(response => {
      setComments(response.data.comments)
      setCurrentUser(response.data)
    })
  }

  useEffect(() => {
    UploadsDataServices.getPostsByUser(currentUser.id).then(response => {
      setYourUploads(response.data.reverse())
    })
    retrieveUser()
  }, [])

  if (!currentUser) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      {editMode ? (
        <div>
          <EditProfile changeToFalse={changeToFalse} />
        </div>
      ) : (
        <div className='row py-5 px-4'>
          <div className='col-md-5 mx-auto'>
            <div className='bg-white shadow rounded overflow-hidden'>
              <div className='px-4 pt-0 pb-4 cover'>
                <div className='media align-items-end profile-head'>
                  <div className='profile profile-image mr-3'>
                    <img
                      src={
                        currentUser.image
                          ? currentUser.image
                          : './../img/profile-picture.jpg'
                      }
                      alt=''
                      width='150'
                      height='150'
                      style={{ objectFit: 'cover' }}
                      className='profile-image rounded mb-2 '
                    />

                    <button
                      className='btn btn-sm btn-block btn-warning text-decoration-none'
                      onClick={() => setEditMode(true)}
                    >
                      Modifier profil
                    </button>
                  </div>
                  <div className='media-body mb-5 text-white'>
                    <h4 className='mt-0 mb-0 text-white'>
                      {currentUser.firstName + ' ' + currentUser.lastName}
                    </h4>
                    <p className='small mb-4'>
                      <a
                        className='text-white text-decoration-none'
                        href={'mailto:' + currentUser.email}
                      >
                        {currentUser.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-light p-4 d-flex justify-content-end text-center'>
                <ul className='list-inline mb-0'>
                  <li className='list-inline-item'>
                    <h5 className='font-weight-bold mb-0 d-block'>
                      {yourUploads.length}{' '}
                    </h5>
                    <small className='text-muted'> Posts</small>
                  </li>
                  <li className='list-inline-item'>
                    <h5 className='font-weight-bold mb-0 d-block'>
                      {comments.length}
                    </h5>
                    <small className='text-muted'> Commentaires</small>
                  </li>
                </ul>
              </div>
              <div className='px-4 py-3'>
                <h5 className='mb-2'>À propos de moi</h5>
                <div className='p-4 rounded shadow-sm bg-light'>
                  <p className='font-italic mb-0'>
                    {currentUser.description
                      ? currentUser.description
                      : 'Vous pouvez rajouter une description 😀'}
                  </p>
                </div>
              </div>
              <div className='px-4 py-4'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <h5 className='mb-0'>Posts récents</h5>
                </div>
                <div className='row'>
                  <div>
                    {yourUploads.map(value => {
                      return (
                        <div key={value.id} className='col-lg mb-2 pr-lg'>
                          <Link to={`/uploads/${value.id}`}>
                            <article className='post'>
                              <div>
                                <img
                                  src={value.image}
                                  className='img-fluid rounded shadow-sm'
                                  width='100%'
                                  alt='post'
                                />
                              </div>
                            </article>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
