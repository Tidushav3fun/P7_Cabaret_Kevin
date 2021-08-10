import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import UserService from '../services/user.service'
import AuthService from '../services/auth.service'

const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Ce champ est requis !
      </div>
    )
  }
}

const Login = props => {
  const form = useRef()
  const checkBtn = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')

  const onChangeEmail = e => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const onChangePassword = e => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleLogin = e => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          props.history.push('/home')
          window.location.reload()
          retrieveUser()
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setLoading(false)
          setMessage(resMessage)
        }
      )
    } else {
      setLoading(false)
    }
  }

  const retrieveUser = () => {
    UserService.getUser(user.id).then(response => {
    
      setUser(response.data)
    })
  }

  return (
    <div className='container'>
      <div className='left'>
        <div className='header'>
          <h2 className='animation a1'>
            Bienvenue sur le réseau social de <strong>Groupomania</strong>
          </h2>
          <h4 className='animation a2'>
            Connectez-vous avec votre adresse email et votre mot de passe
          </h4>
        </div>
        <Form onSubmit={handleLogin} ref={form}>
          <div className='form-group'>
            {/* <label htmlFor='email'>Email</label> */}
            <Input
              type='email'
              placeholder='Email'
              className='form-field animation a3'
              name='email'
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className='form-group'>
            {/* <label htmlFor='password'>Mot de passe</label> */}
            <Input
              type='password'
              placeholder='Mot de passe'
              className='form-field animation a4'
              name='password'
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <button className='animation a5' disabled={loading} id='btn-login'>
            {loading && (
              <span className='spinner-border spinner-border-sm'></span>
            )}
            <span>Se connecter</span>
          </button>

          {message && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
      <div className='right-login'></div>
    </div>
  )
}

export default Login