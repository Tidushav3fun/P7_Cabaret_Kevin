import React, { useState, useEffect } from 'react'
import UploadsDataServices from '../../services/upload.service'
import CommentsService from '../../services/comments.service'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import UserService from '../../services/user.service'
import jwt_decode from 'jwt-decode'
import EditComment from './EditComment'
import { Link } from 'react-router-dom'

const Comments = props => {
  const user = JSON.parse(localStorage.getItem('user'))
  const decodedUser = jwt_decode(user.accessToken)

  const initialUploadState = {
    id: null,
    title: '',
    description: '',
    image: '',
    userId: null,
    user: []
  }

  const [currentUser, setCurrentUser] = useState(decodedUser)
  const [currentUpload, setCurrentUpload] = useState(initialUploadState)
  const [currentComment, setCurrentComment] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editMode, setEditMode] = useState(false)

  const changeToFalse = () => {
    setEditMode(false)
  }

  const setActiveComment = comment => {
    setCurrentComment(comment)
  }

  const retrieveUser = () => {
    UserService.getUser(currentUser.id).then(response => {
      setCurrentUser(response.data)
    })
  }

  const getUpload = id => {
    UploadsDataServices.get(id)
      .then(response => {
        setCurrentUpload(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getComments = () => {
    CommentsService.getAllCommentsByUpload(props.id)
      .then(response => {
        setComments(response.data)
        retrieveUser()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteComment = commentId => {
    CommentsService.deleteComment(props.id, commentId)
      .then(response => {
        getComments(props.id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUpload(props.id)
    getComments(props.id)
    retrieveUser(props.id)
  }, [props.id])

  const data = {
    commentBody: newComment,
    uploadId: currentUpload.id,
    userId: currentUser.id,
    user: currentUpload.user
  }

  const required = value => {
    if (!value) {
      return (
        <div className='alert alert-danger' role='alert'>
          Ce champ est requis !
        </div>
      )
    }
  }

  const addComment = () => {
    if (newComment === '') {
      alert('Vous ne pouvez pas envoyer un commentaire vide !')
    } else {
      CommentsService.createPost(data).then(() => {
        getComments(props.id)
        setNewComment('')
      })
    }
  }

  const handleInputChange = event => {
    setNewComment(event.target.value)
  }

  return (
    <div>
      {editMode ? (
        <div>
          <EditComment
            upload={currentUpload}
            comment={currentComment}
            changeToFalse={changeToFalse}
            retrieveComments={getComments}
          />
        </div>
      ) : (
        <div className=' container-scroll'>
          <div className='row height d-flex justify-content-center align-items-center container-scroll-div'>
            <div className='col'>
              <div className='card'>
                <div className='p-3'>
                  <h6>
                    {comments.length} commentaire
                    {comments.length > 1 ? 's' : null}
                  </h6>
                </div>
                <div className='mt-3 d-flex flex-row align-items-center p-3 form-color'>
                  <img
                    src={
                      currentUser.image
                        ? currentUser.image
                        : './../img/profile-picture.jpg'
                    }
                    alt='profile-picture-comments'
                    width='50'
                    height='50'
                    style={{ objectFit: 'cover' }}
                    className='rounded-circle mr-2'
                  />{' '}
                  <textarea
                    type='text'
                    className='form-control'
                    placeholder={
                      'Bonjour' +
                      ' ' +
                      currentUser.firstName +
                      ' ' +
                      currentUser.lastName +
                      ' ' +
                      ', vous pouvez ajouter votre commentaire...'
                    }
                    onChange={handleInputChange}
                    value={newComment}
                    validations={[required]}
                    rows='4'
                    col='10'
                  />
                </div>
                <button
                  type='button'
                  onClick={addComment}
                  className=' btn btn-outline-danger'
                >
                  Ajouter
                </button>

                <div className='mt-2 comments-scroll '>
                  {comments
                    .slice(0)
                    .reverse()
                    .map((comment, index) => {
                      return (
                        <div key={index} className='d-flex flex-row p-3'>
                          <img
                            src={
                              comment.user.image
                                ? comment.user.image
                                : './../img/profile-picture.jpg'
                            }
                            alt='profile-picture-comments'
                            width='40'
                            height='40'
                            className='rounded-circle mr-3'
                            style={{ objectFit: 'cover' }}
                          />
                          <div className='w-100'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div className='d-flex flex-row align-items-center'>
                                <Link
                                  to={
                                    comment.user.id === currentUser.id
                                      ? '/profile'
                                      : `/user/${comment.user.id}`
                                  }
                                >
                                  <span className='mr-2'>
                                    {comment.user.firstName +
                                      ' ' +
                                      comment.user.lastName}
                                  </span>{' '}
                                </Link>
                              </div>{' '}
                              <small>
                                {new Date(comment.createdAt).toLocaleString(
                                  'fr-FR'
                                )}
                              </small>
                            </div>

                            <p className='text-justify comment-text mb-0'>
                              {comment.commentBody}
                            </p>

                            <div className='d-flex flex-row user-feed'>
                              {' '}
                              <span className='wish'>
                                {currentUser.id === comment.userId ||
                                user.roles == 'ROLE_ADMIN' ? (
                                  <li className='post-like'>
                                    <DeleteForeverIcon
                                      onClick={() => deleteComment(comment.id)}
                                      className='post-like-btn'
                                    />
                                  </li>
                                ) : null}
                              </span>{' '}
                              <span className='ml-3'>
                                {currentUser.id === comment.userId ||
                                user.roles === 'ROLE_ADMIN' ? (
                                  <li className='post-like'>
                                    <EditIcon
                                      onClick={() => {
                                        setEditMode(true)
                                        setActiveComment(comment)
                                      }}
                                      className='post-like-btn'
                                    />
                                  </li>
                                ) : null}
                              </span>{' '}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Comments
