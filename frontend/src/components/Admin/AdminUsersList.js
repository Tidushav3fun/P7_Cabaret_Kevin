import React, { useState, useEffect } from 'react'
import UserService from '../../services/user.service'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'

const AdminUsersList = props => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchName, setSearchName] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [file, setFile] = useState(null)
  const hiddenFileInput = React.useRef(null)
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(true)

  const changeToFalse = () => {
    setEditMode(false)
  }

  const showButton = () => {
    setShow(true)
    setHide(false)
  }

  useEffect(() => {
    retrieveUsers()
  }, [])

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const retrieveUsers = () => {
    UserService.getAllUsers()
      .then(response => {
        setUsers(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const refreshList = () => {
  //   retrieveUsers()
  //   setCurrentUser(null)
  //   setCurrentIndex(-1)
  // }

  const setActiveUser = (user, index) => {
    setCurrentUser(user)
    setCurrentIndex(index)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentUser({ ...currentUser, [name]: value })
  }

  const updateUser = () => {
    UserService.update(currentUser.id, currentUser)
      .then(() => {
        retrieveUsers()
        changeToFalse()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteUser = () => {
    UserService.deleteUser(currentUser.id)
      .then(() => {
        retrieveUsers()
      })
      .catch(err => {
        console.log(err)
      })
    window.location.reload()
  }

  const updateImage = () => {
    const formData = new FormData()

    formData.append('image', currentUser.image)

    UserService.update(currentUser.id, formData)
      .then(() => {
        retrieveUsers()
        changeToFalse()
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

  const findByName = () => {
    UserService.findByName(searchName)
      .then(response => {
        setUsers(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Rechercher un utilisateur'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByName}
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Liste des utilisateurs</h4>
        <ul className='list-group'>
          {users &&
            users.map((user, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.firstName + ' ' + user.lastName}
              </li>
            ))}
        </ul>
        {/* <button className='m-3 btn btn-sm btn-danger' onClick={deleteAllUsers}>
          Supprimer tous les utilisateurs
        </button> */}
      </div>
      <div className='col-md-6'>
        {currentUser ? (
          <>
            {editMode && currentUser ? (
              <div className='jumbotron'>
                <div className='edit-form'>
                  <div className='form-group'>
                    <label htmlFor='firstName'>Prénom</label>
                    <input
                      type='text'
                      className='form-control'
                      id='firstName'
                      name='firstName'
                      value={currentUser.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='lastName'>Nom</label>
                    <input
                      type='text'
                      className='form-control'
                      id='lastName'
                      name='lastName'
                      value={currentUser.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='title'>Email</label>
                    <input
                      type='text'
                      className='form-control'
                      id='mail'
                      name='mail'
                      value={currentUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='title'>Bio</label>
                    <input
                      type='text'
                      className='form-control'
                      id='description'
                      name='description'
                      value={currentUser.description}
                      onChange={handleInputChange}
                    />
                  </div>

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
                      className='btn btn-sm btn-block btn-light btn-block mb-2'
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
                      className='btn btn-sm btn-block btn-success btn-block mb-2 mt-2'
                    >
                      Changer photo
                    </button>
                  )}

                  <button
                    type='submit'
                    className='btn btn-danger mr-2'
                    onClick={deleteUser}
                  >
                    Supprimer
                  </button>
                  <button
                    type='submit'
                    className='btn btn-success'
                    onClick={updateUser}
                  >
                    Modifier
                  </button>
                  {/* <p>{message}</p> */}
                </div>
                <button
                  className='btn btn-warning mt-2'
                  onClick={() => changeToFalse()}
                >
                  Revenir à l'utilisateur n°{currentUser.id}
                </button>
              </div>
            ) : (
              <div>
                <h4 className='mt-2'>Utilisateur</h4>
                <div>
                  <label>
                    <strong>Prénom :</strong>
                  </label>{' '}
                  {currentUser.firstName}
                </div>
                <div>
                  <label>
                    <strong>Nom :</strong>
                  </label>{' '}
                  {currentUser.lastName}
                </div>
                <div>
                  <label>
                    <strong>Email :</strong>
                  </label>{' '}
                  {currentUser.email}
                </div>
                <div>
                  <label>
                    <strong>Bio :</strong>
                  </label>{' '}
                  {currentUser.description}
                </div>
                <div>
                  <label>
                    <strong>Photo de profil :</strong>
                  </label>{' '}
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : currentUser.image
                        ? currentUser.image
                        : './../img/profile-picture.jpg'
                    }
                    alt={file ? file.name : null}
                    width='50'
                    height='50'
                    style={{ objectFit: 'cover' }}
                    className='rounded-circle profile-pic mb-2'
                  />
                </div>
                <button
                  className='btn btn-sm btn-block  btn-warning mt-2'
                  onClick={() => setEditMode(true)}
                >
                  <EditIcon />
                  Editer
                </button>
                <Link
                  className='btn btn-sm btn-block btn-dark'
                  style={{ color: 'white' }}
                  to={`/user/${currentUser.id}`}
                  target='_blank'
                >
                  <VisibilityOutlinedIcon /> Voir utilisateur
                </Link>
              </div>
            )}
          </>
        ) : (
          <div>
            <br />
            <p>Merci de choisir un utilisateur.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsersList
