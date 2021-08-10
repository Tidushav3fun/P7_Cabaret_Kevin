import React, { useState, useEffect } from 'react'

import CommentsService from '../../services/comments.service'

const EditComment = props => {
  const [currentComment, setCurrentComment] = useState('')

  const retrieveComment = () => {
    CommentsService.getOneComment(props.upload.id, props.comment.id).then(
      response => {
        setCurrentComment(response.data.commentBody)
      }
    )
  }

  useEffect(() => {
    retrieveComment()
  }, [])

  const data = {
    commentBody: currentComment,
    uploadId: props.upload.id,
    userId: props.comment.user.id,
    user: props.comment.user
  }

  const updateComment = () => {
    CommentsService.updateComment(props.upload.id, props.comment.id, data)
      .then(() => {
        retrieveComment()
        props.changeToFalse()
        props.retrieveComments()
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <textarea
        className='form-control'
        type='text'
        value={currentComment}
        onChange={e => setCurrentComment(e.target.value)}
      />
      <button onClick={() => updateComment()} className='btn btn-dark mt-3'>
        Modifier commentaire
      </button>

      <button
        className='btn btn-success mt-3 ml-3'
        onClick={() => {
          props.changeToFalse()
          props.retrieveComments()
        }}
      >
        Revenir aux commentaires
      </button>
    </div>
  )
}

export default EditComment
