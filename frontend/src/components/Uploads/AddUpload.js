import React, { useState, useRef } from 'react'
import UploadsDataServices from '../../services/upload.service'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

const AddUpload = () => {
  const form = useRef()
  const checkBtn = useRef()
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(true)

  const showButton = () => {
    setShow(true)
    setHide(false)
  }

  const initialUploadState = {
    id: null,
    title: '',
    description: '',
    image: null,
    userId: null
  }
  const [upload, setUpload] = useState(initialUploadState)
  const [submitted, setSubmitted] = useState(false)
  const [file, setFile] = useState(null)

  const hiddenFileInput = React.useRef(null)

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setUpload({ ...upload, [name]: value })
  }

  const handleFileChange = event => {
    setUpload({ ...upload, [event.target.name]: event.target.files[0] })
    setFile(event.target.files[0])
  }

  const saveUpload = e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', upload.title)
    formData.append('description', upload.description)
    formData.append('image', upload.image)
    formData.append('userId', JSON.parse(localStorage.getItem('user')).id)

    UploadsDataServices.create(formData)
      .then(response => {
        setUpload({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          image: response.data.image,
          userId: response.data.userId
        })
        setSubmitted(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='submit-form'>
      <Form onSubmit={saveUpload} ref={form}>
        {submitted ? (
          <div>
            <h4>
              Upload bien envoyé ! Rendez-vous sur la homepage pour voir votre
              chef d'oeuvre !
            </h4>
          </div>
        ) : (
          <div>
            <div className='form-group'>
              <label htmlFor='title'>Titre</label>
              <Input
                required
                type='text'
                className='form-control'
                id='title'
                value={upload.title}
                onChange={handleInputChange}
                name='title'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                type='text'
                className='form-control'
                id='description'
                required='required'
                value={upload.description}
                onChange={handleInputChange}
                name='description'
                rows='10'
              />
            </div>

            <div className='profile mr-3 profile-pic img__wrap text-center'>
              <img
                src={file ? URL.createObjectURL(file) : './../img/cat.gif'}
                alt={file ? file.name : null}
                width='300px'
                height='300px'
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
                  onClick={saveUpload}
                  className='btn btn-sm btn-block btn-success btn-block mb-2 mt-2'
                >
                  Envoyer !
                </button>
              )}
            </div>

            {/* <div className='form-group'>
              <label htmlFor='image'></label>
              <input
                type='file'
                className='form-control-file'
                required
                onChange={handleFileChange}
                name='image'
              />
            </div> */}

            {/* <ImgCrop rotate>
              <Upload
                listType='picture-card'
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop> */}
            {/* <button className='btn btn-success'>Envoyer</button> */}
          </div>
        )}
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>
  )
}

export default AddUpload
