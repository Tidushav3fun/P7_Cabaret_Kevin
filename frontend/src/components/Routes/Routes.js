import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './../../pages/Home'
// import Profile from '../Profile/Profile'
import Login from './../../pages/Login'
import Register from './../../pages/Register'
import BoardAdmin from './../Boards/BoardAdmin'
import BoardModerator from './../Boards/BoardModerator'

import BoardUploads from './../Boards/BoardUploads'
import NotFound from './NotFound'

import ProfilePage from './../../pages/ProfilePage'
import OneUpload from './../Uploads/OneUpload'
import UserProfile from '../Profile/UserProfile'

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/user/:id' component={UserProfile} />
        <Route exact path='/uploads' component={BoardUploads} />
        <Route exact path='/uploads/:id' component={OneUpload} />
        <Route exact path='/mod' component={BoardModerator} />
        <Route exact path='/admin' component={BoardAdmin} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default Routes
