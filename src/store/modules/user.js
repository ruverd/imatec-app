import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { User } from '@/utils/user'
import { Acl } from '@/utils/acl'

const user = {
  state: {
    info: [],
    token: getToken(),
    avatar: '',
    introduction: '',
    roles: [],
    acl: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ACL: (state, acl) => {
      state.acl = acl
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    LoginByUsername({ commit, dispatch }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.access_token)
          setToken(response.data.access_token)
          dispatch('AfterLogin')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    AfterLogin({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        dispatch('GetUserInfo')
        dispatch('GetAcl')
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        User.get().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          commit('SET_ROLES', ['admin'])
          commit('SET_INFO', data)
          commit('SET_AVATAR', process.env.BASE_API + '/images/avatars/' + state.info.id + '.jpg')
          commit('SET_INTRODUCTION', 'Olá ' + state.info.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAcl({ commit, state }) {
      return new Promise((resolve, reject) => {
        Acl.get().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          commit('SET_ACL', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_ACL', [])
          commit('SET_INFO', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
