const app = {
  state: {
    sidebar: {
      opened: !+localStorage.getItem('sidebarStatus')
    },
    language: localStorage.getItem('language') || 'en',
    editlang: 'en',
    shoppingMallId: localStorage.getItem('shoppingMallId') || '',
    themeColor: '#409EFF',
    bread: ''
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        localStorage.setItem('sidebarStatus', 1)
      } else {
        localStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      localStorage.setItem('language', language)
    },
    SET_EDITLANG: (state, editlang) => {
      state.editlang = editlang
    },
    SET_SHOPPINGMALLID: (state, id) => {
      state.shoppingMallId = id
      localStorage.setItem('shoppingMallId', id)
    },
    SET_THEMECOLOR: (state, color) => {
      state.themeColor = color
    },
    SET_BREAD: (state, bread) => {
      state.bread = bread
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },

    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setEditlang({ commit }, editlang) {
      commit('SET_EDITLANG', editlang)
    },
    setShoppingMallId({ commit }, id) {
      commit('SET_SHOPPINGMALLID', id)
    },
    setThemeColor({ commit }, color) {
      commit('SET_THEMECOLOR', color)
    }
  }
}

export default app
