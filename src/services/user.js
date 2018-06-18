import axios from 'axios'
export class User {
  static get() {
    return axios.get('/user')
  }
}

