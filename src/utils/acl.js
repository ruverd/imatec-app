import request from './request'
export class Acl {
  static get() {
    return request({
      url: '/acl',
      method: 'get'
    })
  }
}

