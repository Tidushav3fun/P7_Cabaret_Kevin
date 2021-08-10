import axios from 'axios';


const API_URL = "http://localhost:5000/api"

class CommentsService {
  getAllCommentsByUpload(uploadId) {
    return axios.get(API_URL + `/comments/${uploadId}`)
  }

  createPost(data) {
    return axios.post(API_URL + `/comments`, data)
  }

  deleteComment(uploadId, commentId) {
    return axios.delete(API_URL + `/comments/${uploadId}/${commentId}`)
  }

  updateComment(uploadId, commentId, data) {
    return axios.put(API_URL + `/comments/${uploadId}/${commentId}`, data)
  }

  getOneComment(uploadId, commentId) {
    return axios.get(API_URL + `/comments/${uploadId}/${commentId}`)
  }
}

export default new CommentsService()