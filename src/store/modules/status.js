const status = {
  state: {
    pages: {
      pagination: {
        currentPage: 1,
        total: 0
      },
      q: {},
      sort: ''
    },
    stores: {
      pagination: {
        currentPage: 1,
        total: 0
      },
      q: {},
      sort: ''
    },
    categories: {
      pagination: {
        currentPage: 1,
        total: 0
      },
      q: {},
      sort: ''
    },
    orders: {
      pagination: {
        currentPage: 1,
        total: 0
      },
      q: {},
      sort: ''
    }

  },
  mutations: {
    SET_STATUS: (state, status) => {
      state[status.type] = status
    }
  },
  actions: {
    setStatus: ({ commit }, status) => {
      commit('SET_STATUS', status)
    }

  }
}

export default status
