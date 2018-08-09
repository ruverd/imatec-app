import { Passport } from './passport' // importat class class
import LocalStorage from './localStorage' // importar o ficheiro do localstorage para o gerir
import { User } from './user'

const TOKEN = 'token'
const USER = 'user' // valor que vai ser guardado no local storage

const afterLogin = (response) => { // esta constante serve para guardar a função de configuração do que aontece depois do login ser feito
  User.get().then((response) => {
    LocalStorage.setObject(USER, response.data) // .then (a nossa promeça), adiciona ao localstorage no valor USER os dados que nos são enviado na requisição
  })
}
export default {
  login(email, password) {
    return Passport.accessToken(email, password).then((response) => {
      LocalStorage.set(TOKEN, response.data.access_token)
      afterLogin(response) // emite a função de configuração afterLogin, se for sucesso corre a função e guarda os dados do USER no localstorage
      return response
    })
  },

  // metodo de logout
  logout() {
    const afterLogout = () => {
      this.clearAuth() // limpa o token (função desta pagina)
    }
    return Passport.logout()
      .then(afterLogout())
      .catch(afterLogout())
  },

  // refresh token, para o caso do tokem ter exppirado não ser necessario voltar a fazer login
  refreshToken() {
    return Passport.refreshToken().then((response) => {
      LocalStorage.set(TOKEN, response.data.token) // atribui o token novamente
      return response // retorna a resposta para o caso de ser necessario de fazer mais alguam coisa
    })
  },

  // metodo para envio de tokencom o Bearer
  getAuthorizationHeader() {
    return `Bearer ${LocalStorage.get(TOKEN)}` // retorna o token necessario para enviar para o header
  },

  // metodo para pegar usuario em formato de objeto javascript
  user() {
    return LocalStorage.getObject(USER)
  },

  // verifica se está autenticado (se o token existe)
  check() {
    return LocalStorage.get(TOKEN) ? true : false // se o token existir retorna true, se não exitir retorn false
  },

  // apagar autenticação apos o tokem expirar (2 semanas)
  clearAuth() {
    LocalStorage.remove(TOKEN) // limpa o TOKEN do localstorage mesmo antes de fazer logout
    LocalStorage.remove(USER) // limpa o USER do localstorage mesmo antes de fazer logout
  }
}
