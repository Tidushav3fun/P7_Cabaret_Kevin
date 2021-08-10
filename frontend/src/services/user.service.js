import axios from 'axios'

const API_URL = 'http://localhost:5000/api/userService/'

class UserService {
  getUploadsBoard () {
    return axios.get(API_URL + 'uploads')
  }

  getModeratorBoard () {
    return axios.get(API_URL + 'mod')
  }

  getAdminBoard () {
    return axios.get(API_URL + 'admin')
  }

  getAllUsers () {
    return axios.get(API_URL + 'users')
  }

  getUser (id) {
    return axios.get(API_URL + `users/${id}`)
  }

  deleteUser (id) {
    return axios.delete(API_URL + `users/${id}`)
  }

  deleteAll () {
    return axios.delete(API_URL + 'users/')
  }

  update (id, data) {
    return axios.put(API_URL + `users/${id}`, data)
  }

  findByName (name) {
    return axios.get(API_URL + `users?firstName=${name}`)
  }
}

export default new UserService()
