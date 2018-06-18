import axios from 'axios'
export class Acl {
  static get() {
    return axios.get('/acl')
  }
}

