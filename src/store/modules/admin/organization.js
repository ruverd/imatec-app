const organization = {
  state: {
    dialog: false
  },

  mutations: {
    SET_DIALOG: (state, visibled) => {
      console.log(visibled)
      state.dialog = visibled
    }
  },

  actions: {
    DialogVisibled({ commit, dispatch }, visibled) {
      console.log('entrou')
      commit('SET_DIALOG', visibled)
    }
  }
}

export default organization
