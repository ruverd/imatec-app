import axios from 'axios'
export class Passport {
  static accessToken(email, password) {
    return axios.post(process.env.ROUTER_TOKEN, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'password',
      username: email,
      password: password,
      scope: '*'
    })
  }

  //logout
  static logout() {
    //return Vue.http.post('logout') // (../routes/api.php)
  }

  // refresh token (para quando o token expiar não ser necessário fazer login novamente)
  static refreshToken() {
    //return Vue.http.post('refresh_token') // estes Vue.http.post('****') são as nossas rotas definidas nas nossas rotas do laravel
  }
}

