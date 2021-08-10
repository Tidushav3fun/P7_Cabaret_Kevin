import jwt_decode from 'jwt-decode';

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  
} from './../actions/types.action'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
  ? { isLoggedIn: true, user: jwt_decode(user.accessToken) }
  : { isLoggedIn: false, user: null }

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    
    default:
      return state
  }
}

