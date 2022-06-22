import axios from 'axios'

export const state = () => ({
  adminBooks: [],
  adminBook: null,
  adminBookPages: [],
  adminBookPage: null,
})

export const mutations = {
  setAdminBooks: (state, adminBooks) => (state.adminBooks = adminBooks),
  setAdminBook: (state, adminBook) => (state.adminBook = adminBook),
  setAdminBookPages: (state, adminBookPages) =>
    (state.adminBookPages = adminBookPages),
  setAdminBookPage: (state, adminBookPage) =>
    (state.adminBookPage = adminBookPage),
}

export const actions = {
  async getAdminBooks({ commit }) {
    const response = await axios.get('/books.json')
    commit('setAdminBooks', response.data)
  },

  async getAdminBookById({ commit }, id) {
    const response = await axios.get('/books.json')
    commit('setAdminBook', response.data[id - 1])
  },

  async getAdminBookPages({ commit }) {
    const response = await axios.get('/books.json')
    commit('setAdminBookPages', response.data)
  },

  async getAdminBookPage({ commit }, id) {
    const response = await axios.get('/books.json')
    commit('setAdminBookPage', response.data)
  },
}

export const getters = {
  allAdminBooks: (state) => state.adminBooks,
  adminBookById: (state) => state.adminBook,
  adminBookPages: (state) => state.adminBookPages,
  adminBookPageById: (state) => state.adminBookPage,
}
