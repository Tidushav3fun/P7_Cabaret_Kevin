import axios from 'axios';


const API_URL = "http://localhost:5000/api/auth/";

class AuthService {

  login(email, password) {
    return axios
    .post(API_URL + "signin", {
      email,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data
    });
  }

  logout() {
    localStorage.removeItem("user")
    window.location.reload()
    window.location.href = `http://localhost:3000/login`

  }

  register(firstName, lastName, email, password) {
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      email,
      password
    });
  }

  getCurrentUser() {

    // const jwt = JSON.parse(localStorage.getItem('user')).accessToken
    return JSON.parse(localStorage.getItem("user"));
    // récupérer via le token et pas le localStorage
  }
}

export default new AuthService();