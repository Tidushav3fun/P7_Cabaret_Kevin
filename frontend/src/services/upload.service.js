import axios from 'axios';


const API_URL = "http://localhost:5000/api"

class UploadsDataServices {
  getAll() {
    return axios.get(API_URL + '/uploads')
  }

  get(id) {
    return axios.get(API_URL + `/uploads/${id}`)
  }

  getPostsByUser(userId) {
    return axios.get(API_URL + `/uploads/user/${userId}`)
  }

  create(data) {
    return axios.post(API_URL + "/uploads", data, {
      headers: {"Content-Type" : "multipart/form-data"}
    })
  }

  update(id, data) {
    return axios.put(API_URL + `/uploads/${id}`, data)
  }

  delete(id) {
    return axios.delete(API_URL + `/uploads/${id}`)
  }

  deleteAll() {
    return axios.delete(API_URL + `/uploads`)
  }

  findByTitle(title) {
    return axios.get(API_URL + `/uploads?title=${title}`)
  }

  // postLike(userId, uploadId) {
  //   return axios.post(API_URL + `/uploads/like`, userId, uploadId)
  // }

  postLike(id, like) {
    return axios.post(API_URL + `/uploads/${id}/like`, like)
  }

}

export default new UploadsDataServices();

