import request from './request'
export class User {
  static get() {
    return request({
      url: '/user',
      method: 'get'
    })
  }
}
