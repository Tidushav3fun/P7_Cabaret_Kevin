import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from './../Utils/Utils'
import UploadsDataServices from '../../services/upload.service'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import jwt_decode from 'jwt-decode'
import UserService from '../../services/user.service'
import { Card, Avatar } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

const { Meta } = Card

const UploadsList = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const decodedUser = jwt_decode(user.accessToken)

  const [currentUser, setCurrentUser] = useState(decodedUser)
  const [uploads, setUploads] = useState([])
  const [editMode, setEditMode] = useState(false)

  const changeToFalse = () => {
    setEditMode(false)
  }

  const retrieveUser = () => {
    UserService.getUser(currentUser.id).then(response => {
      setCurrentUser(response.data)
    })
  }

  const retrieveUploads = () => {
    UploadsDataServices.getAll().then(response => {
      setUploads(response.data)
    })
  }

  useEffect(() => {
    retrieveUser()
    retrieveUploads()
  }, [])

  return (
    <div>
      <div className='list-uploads'>
        
        {!isEmpty(uploads) &&
          uploads.map(upload => {
            return (
              <div key={upload.id}>
                {currentUser.id === upload.userId ||
                user.roles == 'ROLE_ADMIN' ? (
                  !editMode ? (
                    <Card
                      className='col-md-auto mx-auto'
                      style={{
                        maxWidth: 800,
                        width: '80%',
                        marginBottom: 20
                      }}
                      cover={
                        <img
                          alt='upload-pic-homepage'
                          src={upload.image}
                          height='700px'
                          style={{ objectFit: 'cover' }}
                        />
                      }
                      actions={[
                        <Link to={`/uploads/${upload.id}`}>
                          <EllipsisOutlined
                            key='comments'
                            style={{ fontSize: '20px' }}
                          />
                        </Link>
                      ]}
                    >
                      <Meta
                        avatar={<Avatar src={upload.user.image} />}
                        title={upload.title}
                        description={upload.description}
                      />
                      <br />
                      <br />
                      <div>
                        <blockquote className='blockquote'>
                          <footer className='blockquote-footer'>
                            posté par{' '}
                            <Link
                              to={
                                currentUser.id === upload.user.id
                                  ? '/profile'
                                  : `/user/${upload.user.id}`
                              }
                              className='post-title'
                            >
                              <cite
                                title={
                                  upload.user.firstName +
                                  ' ' +
                                  upload.user.lastName
                                }
                              >
                                {upload.user.firstName +
                                  ' ' +
                                  upload.user.lastName}
                              </cite>
                            </Link>
                          </footer>
                        </blockquote>
                        <FavoriteBorder /> {upload._likes.length}
                      </div>
                    </Card>
                  ) : (
                    <div>
                      <h2>JE MODIFIE LE POST</h2>
                      <button
                        className='btn btn-warning'
                        onClick={() => changeToFalse()}
                      >
                        Revenir au post n°{upload.id}
                      </button>
                    </div>
                  )
                ) : (
                  <Card
                    className='col-md-auto mx-auto'
                    style={{ maxWidth: 800, width: '80%', marginBottom: 20 }}
                    cover={
                      <img
                        alt='example'
                        src={upload.image}
                        height='700px'
                        style={{ objectFit: 'cover' }}
                      />
                    }
                    actions={[
                      <Link to={`/uploads/${upload.id}`}>
                        <EllipsisOutlined
                          key='comments'
                          style={{ fontSize: '20px' }}
                        />
                      </Link>
                    ]}
                  >
                    <Meta
                      avatar={<Avatar src={upload.user.image} />}
                      title={upload.title}
                      description={upload.description}
                    />
                    <br />
                    <br />
                    <blockquote className='blockquote'>
                      <footer className='blockquote-footer'>
                        posté par{' '}
                        <Link
                          to={`/user/${upload.user.id}`}
                          className='post-title'
                        >
                          <cite title='Author'>
                            {upload.user.firstName + ' ' + upload.user.lastName}
                          </cite>
                        </Link>
                      </footer>
                    </blockquote>
                    <FavoriteBorder /> {upload._likes.length}
                  </Card>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default UploadsList
