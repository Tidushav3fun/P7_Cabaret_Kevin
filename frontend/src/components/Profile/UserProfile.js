import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UploadsDataServices from '../../services/upload.service'
import UserService from '../../services/user.service'


const UpdateUser = props => {
  const initialUserState = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    image: ''
  }

  const [user, setUser] = useState(initialUserState)
  const [uploads, setUploads] = useState([])
  const [comments, setComments] = useState([])

  const getUser = id => {
    UserService.getUser(id)
      .then(response => {
        setUser(response.data)
        setComments(response.data.comments)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUser(props.match.params.id)

    UploadsDataServices.getPostsByUser(props.match.params.id).then(response => {
      
      setUploads(response.data.reverse())
    })
  }, [props.match.params.id])

  return (
    <div className='row py-5 px-4'>
      <div className='col-md-5 mx-auto'>
        <div className='bg-white shadow rounded overflow-hidden'>
          <div className='px-4 pt-0 pb-4 cover'>
            <div className='media align-items-end profile-head'>
              <div className='profile mr-3'>
                <img
                  src={user.image ? user.image : './../img/profile-picture.jpg'}
                  alt=''
                  width='150'
                  height='150'
                  style={{ objectFit: 'cover' }}
                  className='rounded mb-2 '
                />
              </div>
              <div className='media-body mb-5 text-white'>
                <h4 className='mt-0 mb-0 text-white'>
                  {user.firstName + ' ' + user.lastName}
                </h4>
                <p className='small mb-4'>
                  <a
                    className='text-white text-decoration-none'
                    href={'mailto:' + user.email}
                  >
                    {user.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className='bg-light p-4 d-flex justify-content-end text-center'>
            <ul className='list-inline mb-0'>
              <li className='list-inline-item'>
                <h5 className='font-weight-bold mb-0 d-block'>
                  {uploads.length}{' '}
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
                {user.description
                  ? user.description
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
                {uploads.map(value => {
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
  )
}

export default UpdateUser
