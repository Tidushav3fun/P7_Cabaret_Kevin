import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import UploadsDataServices from '../../services/upload.service'
import UserService from '../../services/user.service'
import jwt_decode from 'jwt-decode'

import ModalButtonDeleteUser from './../ModalButton/ModalButtonDeleteUser'

const EditProfile = props => {
  const user = JSON.parse(localStorage.getItem('user'))
  const decodedUser = jwt_decode(user.accessToken)

  const [currentUser, setCurrentUser] = useState(decodedUser)
  const [yourUploads, setYourUploads] = useState([])
  const [comments, setComments] = useState([])
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(true)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

  const hiddenFileInput = React.useRef(null)

  const showButton = () => {
    setShow(true)
    setHide(false)
  }

  const retrieveUser = () => {
    UserService.getUser(currentUser.id)
      .then(response => {
        setComments(response.data.comments)
        setCurrentUser(response.data)
      })
      .catch(err => console.log(err))
  }

  const updateUser = () => {
    UserService.update(currentUser.id, currentUser)
      .then(response => {
        retrieveUser()
        props.changeToFalse()
        setMessage('Cet utilisateur a été modifié avec succès')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentUser({ ...currentUser, [name]: value })
  }

  useEffect(() => {
    UploadsDataServices.getPostsByUser(currentUser.id).then(response => {
      setYourUploads(response.data.reverse())
    })

    retrieveUser()
  }, [])

  const updateImage = () => {
    const formData = new FormData()

    formData.append('image', currentUser.image)

    UserService.update(currentUser.id, formData)
      .then(() => {
        setMessage('Cet utilisateur a été modifié avec succès')
        retrieveUser()
        props.changeToFalse()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFileChange = event => {
    setCurrentUser({
      ...currentUser,
      [event.target.name]: event.target.files[0]
    })
    setFile(event.target.files[0])
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  if (!currentUser) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <div className='edit-form test'>
        <div className='row py-5 px-4'>
          <div className='col-lg-5 mx-auto'>
            <div className='bg-white shadow rounded overflow-hidden'>
              <div className='px-4 pt-0 pb-4 cover'>
                <div className='media align-items-end profile-head'>
                  <div className='profile mr-3 profile-pic img__wrap text-center '>
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : currentUser.image
                          ? currentUser.image
                          : './../img/profile-picture.jpg'
                      }
                      alt={file ? file.name : null}
                      width='150'
                      height='150'
                      style={{ objectFit: 'cover' }}
                      className='rounded profile-pic mb-2'
                    />
                    {hide && (
                      <button
                        className='btn btn-sm btn-block btn-dark mb-2'
                        onClick={() => {
                          handleClick()
                          showButton()
                        }}
                      >
                        Choisir photo
                      </button>
                    )}
                    <input
                      ref={hiddenFileInput}
                      style={{ display: 'none' }}
                      type='file'
                      className='form-control'
                      id='image'
                      name='image'
                      onChange={handleFileChange}
                    />
                    {show && (
                      <button
                        onClick={updateImage}
                        className='btn btn-sm btn-block btn-success btn-block mt-2'
                      >
                        Changer photo de profil
                      </button>
                    )}

                    {/* <p className="img__description">Changer photo<AddCircleIcon></AddCircleIcon></p> */}

                    <button
                      className='btn btn-sm btn-block btn-info btn-block'
                      onClick={() => props.changeToFalse()}
                    >
                      Retour au profil
                    </button>
                  </div>

                  <div className='media-body mb-5 text-white'>
                    <div className='form-row'>
                      <div className='col-lg mb-2'>
                        <input
                          type='text'
                          className='form-control'
                          id='firstName'
                          placeholder='Prénom'
                          name='firstName'
                          value={currentUser.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='col'>
                        <input
                          type='text'
                          className='form-control'
                          id='lastName'
                          placeholder='Nom'
                          name='lastName'
                          value={currentUser.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <p className='small mb-4 mt-2'>
                      <input
                        type='email'
                        placeholder='Email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={currentUser.email}
                        onChange={handleInputChange}
                      />
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
                  <p className='small mb-4 mt-2'>
                    <textarea
                      type='text'
                      placeholder='Entrez une description ici'
                      className='form-control'
                      id='description'
                      name='description'
                      value={currentUser.description ? currentUser.description : ' '}
                      onChange={handleInputChange}
                    />
                  </p>
                </div>
              </div>
              <div className='px-4 py-4'>
                <button
                  type='submit'
                  className=' btn badge-success text-decoration-none'
                  onClick={updateUser}
                >
                  Valider les modifications
                </button>
                <ModalButtonDeleteUser id={currentUser.id} />
                {/* <button className='btn badge-danger ' onClick={deleteUser}>
                  Supprimer le profil
                </button> */}
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
