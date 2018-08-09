// //import Auth from './auth'
// import axios from 'axios'
// import LocalStorage from './localStorage' // importar o ficheiro do localstorage para o gerir
// // import appConfig from './appConfig'
// const _TOKEN = LocalStorage.get('token')
//
// // Add a request interceptor
// axios.interceptors.request.use((config) => {
//   // Do something before request is sent
//   const _URL = (config.url === process.env.ROUTER_TOKEN) ? config.url : `/api${config.url}`
//   config.url = process.env.BASE_API + _URL
//   console.log('interception')
//   console.log(config.url)
//   if (_TOKEN !== null) {
//     config.headers.Authorization = `Bearer ${_TOKEN}`
//   }
//   return config
// }, (error) => {
//   // Do something with request error
//   return Promise.reject(error)
// })
//
// // Add a response interceptor
// axios.interceptors.response.use((response) => {
//   // Do something with response data
//   return response
// }, (error) => {
//   // Do something with response error
//   return Promise.reject(error)
// })
// // //interceptor para adicionar o token no header da requesição
// // Vue.http.interceptors.push((request, next)=> {
// //   request.headers.set('Authorization', Auth.getAuthorizationHeader()) // configurar a requesiçao
// //   next() // passa para o proximo interceptor, até não haver mais interceptors
// // });
// //
// // // interceptor para o refresh token, verifica se esta expirado
// // Vue.http.interceptors.push((request, next) => {
// //   next((response) => {
// //     if(response.status === 401 || response.status === 0) { // se token esta expirado
// //       return Auth.refreshToken()
// //         .then(() => { //tenta fazer um refresh ao token
// //           return Vue.http(request) // caso o refresh tenha sido feito com sucesso, retorna a RESPONSE ORIGINAL para que faça o que o utilizador pediu
// //         })
// //         .catch(() => {
// //           Auth.clearAuth() // limpa o token do localstorage metodo do auth.js
// //           window.location.href = appConfig.login_url
// //         }) // redireciona para o login, caso o token tenha expirado (2 semanas)
// //     }
// //   });
// // });
