import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { register } from './../actions/auth.action'

const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Ce champ est requis !
      </div>
    )
  }
}

const validEmail = value => {
  if (!isEmail(value)) {
    return <div className='alert alert-danger'>Ce mail n'est pas valide.</div>
  }
}

const validFirstName = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Indiquez votre prénom.
      </div>
    )
  }
}

const validLastName = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        Indiquez votre nom.
      </div>
    )
  }
}

const validPassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger'>
        Le mot de passe doit contenir entre 6 et 40 caractères.
      </div>
    )
  }
}

const Register = () => {
  const form = useRef()
  const checkBtn = useRef()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector(state => state.messageReducer)
  const dispatch = useDispatch()

  const onChangeFirstName = e => {
    e.preventDefault()
    setFirstName(e.target.value)
  }

  const onChangeLastName = e => {
    e.preventDefault()
    setLastName(e.target.value)
  }

  const onChangeEmail = e => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const onChangePassword = e => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleRegister = e => {
    e.preventDefault()
    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstName, lastName, email, password))
        .then(() => {
          setSuccessful(true)
        })
        .catch(() => {
          setSuccessful(false)
        })
    }
  }

  return (
    <div className='container'>
      <div className='left'>
        <div className='header'>
          <h2 className='animation a1'>
            Bienvenue sur le réseau social de <strong>Groupomania</strong>
          </h2>
          <h4 className='animation a2'>
            Inscrivez-vous et rejoignez vos collaborateurs.
          </h4>
        </div>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className='form-group'>
                <Input
                  type='text'
                  placeholder='Prénom'
                  className='form-field animation a3'
                  name='firstName'
                  value={firstName}
                  onChange={onChangeFirstName}
                  validations={[required, validFirstName]}
                />
              </div>

              <div className='form-group'>
                <Input
                  type='text'
                  placeholder='Nom'
                  className='form-field animation a4'
                  name='lastName'
                  value={lastName}
                  onChange={onChangeLastName}
                  validations={[required, validLastName]}
                />
              </div>

              <div className='form-group'>
                <Input
                  type='email'
                  placeholder='Email'
                  className='form-field animation a5'
                  name='email'
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className='form-group'>
                <Input
                  type='password'
                  placeholder='Mot de passe'
                  className='form-field animation a6'
                  name='password'
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, validPassword]}
                />
              </div>
              
                <button className='animation a7' id='btn-register'>
                  S'inscrire
                </button>
              
            </div>
          )}

          {message && (
            <div className='form-group'>
              <div
                className={
                  successful ? 'alert alert-success' : 'alert alert-danger'
                }
                role='alert'
              >
                {message}
              </div>
              <Link to={'/login'}>
                <button className='btn-model'>Connectez-vous</button>
              </Link>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
      <div className='right-register'></div>
    </div>
  )
}

export default Register
