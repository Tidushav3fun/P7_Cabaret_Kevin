import React, { useState, useEffect } from 'react'
import UploadsDataServices from '../../services/upload.service'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons'

import { Card, Avatar } from 'antd'

const { Meta } = Card

const EditUpload = props => {
  const currentUser = useSelector(state => state.authReducer).user

  const [currentUpload, setCurrentUpload] = useState(null)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(true)

  const hiddenFileInput = React.useRef(null)

  const showButton = () => {
    setShow(true)
    setHide(false)
  }

  const getUpload = () => {
    UploadsDataServices.get(props.id)
      .then(response => {
        setCurrentUpload(response.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getUpload()
  }, [])

  const updateUpload = () => {
    UploadsDataServices.update(props.id, currentUpload)
      .then(() => {
        getUpload()
        props.changeToFalse()
        setMessage('Ce post a été modifié avec succès')
      })
      .catch(err => console.log(err))
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentUpload({ ...currentUpload, [name]: value })
  }

  const updateImage = () => {
    const formData = new FormData()

    formData.append('image', currentUpload.image)

    UploadsDataServices.update(currentUpload.id, formData)
      .then(() => {
        props.changeToFalse()
        setMessage("L'image a été modifiée avec succès")
        getUpload()
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

  return (
    <div>
      {currentUpload ? (
        <>
          <Card
            className='col-md-auto mx-auto'
            style={{ maxWidth: 800, width: '80%', marginBottom: 20 }}
            cover={
              <img
                src={file ? URL.createObjectURL(file) : currentUpload.image}
                alt={file ? file.name : null}
                width='300px'
                height='600px'
                style={{ objectFit: 'cover' }}
                className='rounded profile-pic mb-2'
              />
            }
            actions={[
              <CheckOutlined
                key='edit'
                style={{ fontSize: '20px' }}
                onClick={updateUpload}
              />,
              <ArrowLeftOutlined
                key='edit'
                style={{ fontSize: '20px' }}
                onClick={() => props.changeToFalse()}
              />
            ]}
          >
            {hide && (
              <button
                className='btn btn-sm btn-block btn-dark '
                onClick={() => {
                  handleClick()
                  showButton()
                }}
              >
                Choisir image
              </button>
            )}
            {show && (
              <button
                onClick={updateImage}
                className='btn btn-sm btn-block btn-success btn-block mt-2'
              >
                Changer image
              </button>
            )}

            <div className='form-group'>
              <label htmlFor='image'></label>
              <input
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                type='file'
                className='form-control-file'
                id='image'
                required
                onChange={handleFileChange}
                name='image'
              />
            </div>
            <Meta
              avatar={<Avatar src={currentUpload.user.image} />}
              title={
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  name='title'
                  value={currentUpload.title}
                  onChange={handleInputChange}
                />
              }
              description={
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  name='description'
                  value={currentUpload.description}
                  onChange={handleInputChange}
                />
              }
            />
            <br />
            <br />
            <blockquote className='blockquote'>
              <footer className='blockquote-footer'>
                posté par{' '}
                <Link
                  to={
                    currentUpload.user.id === currentUser.id
                      ? '/profile'
                      : `/user/${currentUpload.user.id}`
                  }
                  className='post-title'
                >
                  <cite
                    title={
                      currentUpload.user.firstName +
                      ' ' +
                      currentUpload.user.lastName
                    }
                  >
                    {currentUpload.user.firstName +
                      ' ' +
                      currentUpload.user.lastName}
                  </cite>
                </Link>
              </footer>
            </blockquote>

            {message && (
              <div className='form-group'>
                <div
                  className='alert alert-success'
                  data-dismiss='alert'
                  role='alert'
                >
                  {message}
                </div>
              </div>
            )}
          </Card>
        </>
      ) : (
        <div>
          <br />
          <p>Choisissez un post.</p>
        </div>
      )}
    </div>
  )
}

export default EditUpload
