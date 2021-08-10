import React, { useState, useEffect } from 'react'
import UploadsDataService from '../../services/upload.service'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import { Link } from 'react-router-dom'

const AdminUploadsList = () => {
  const [uploads, setUploads] = useState([])
  const [currentUpload, setCurrentUpload] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchTitle, setSearchTitle] = useState('')
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
    retrieveUploads()
  }, [])

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle)
  }

  const retrieveUploads = () => {
    UploadsDataService.getAll()
      .then(response => {
        setUploads(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const refreshList = () => {
  //   retrieveUploads()
  //   setCurrentUpload(null)
  //   setCurrentIndex(-1)
  // }

  const setActiveUpload = (upload, index) => {
    setCurrentUpload(upload)
    setCurrentIndex(index)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentUpload({ ...currentUpload, [name]: value })
  }

  const updateUpload = () => {
    UploadsDataService.update(currentUpload.id, currentUpload)
      .then(response => {
        retrieveUploads()
        changeToFalse()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateImage = () => {
    const formData = new FormData()

    formData.append('image', currentUpload.image)

    UploadsDataService.update(currentUpload.id, formData)
      .then(response => {
        retrieveUploads()
        changeToFalse()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFileChange = event => {
    setCurrentUpload({
      ...currentUpload,
      [event.target.name]: event.target.files[0]
    })
    setFile(event.target.files[0])
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const deleteUpload = () => {
    UploadsDataService.delete(currentUpload.id)
      .then(() => {
        retrieveUploads()
      })
      .catch(err => {
        console.log(err)
      })
    window.location.reload()
  }

  const findByTitle = () => {
    UploadsDataService.findByTitle(searchTitle)
      .then(response => {
        setUploads(response.data)
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
            placeholder='Rechercher un post'
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByTitle}
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Liste des posts</h4>
        <ul className='list-group'>
          {uploads &&
            uploads.map((upload, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveUpload(upload, index)}
                key={index}
              >
                {upload.title}
              </li>
            ))}
        </ul>
      </div>
      <div className='col-md-6'>
        {currentUpload ? (
          <>
            {editMode && currentUpload ? (
              <div className='jumbotron'>
                <div className='edit-form'>
                  <div className='form-group'>
                    <label htmlFor='title'>Titre</label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      name='title'
                      value={currentUpload.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='title'>Description</label>
                    <textarea
                      type='text'
                      className='form-control'
                      id='description'
                      name='description'
                      value={currentUpload.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : currentUpload.image
                        ? currentUpload.image
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
                    onClick={deleteUpload}
                  >
                    Supprimer
                  </button>
                  <button
                    type='submit'
                    className='btn btn-success'
                    onClick={updateUpload}
                  >
                    Modifier
                  </button>

                  {/* <p>{message}</p> */}
                </div>
                <button
                  className='btn btn-warning mt-2'
                  onClick={() => changeToFalse()}
                >
                  Retour
                </button>
              </div>
            ) : (
              <div>
                <h4 className='mt-2'>Upload</h4>
                <div>
                  <label>
                    <strong>Titre :</strong>
                  </label>{' '}
                  {currentUpload.title}
                </div>
                <div>
                  <label>
                    <strong>Description :</strong>
                  </label>{' '}
                  {currentUpload.description}
                </div>
                <div>
                  <label>
                    <strong>Image :</strong>
                  </label>{' '}
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : currentUpload.image
                        ? currentUpload.image
                        : './../img/profile-picture.jpg'
                    }
                    alt={file ? file.name : null}
                    width='150'
                    height='150'
                    style={{ objectFit: 'cover' }}
                    className='rounded profile-pic mb-2'
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
                  to={`/uploads/${currentUpload.id}`}
                  target='_blank'
                >
                  <VisibilityOutlinedIcon /> Voir post
                </Link>
              </div>
            )}
          </>
        ) : (
          <div>
            <br />
            <p>Merci de choisir un post.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUploadsList
