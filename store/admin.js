import axios from 'axios'

export const state = () => ({
  adminEmail: null,
  adminBooks: [],
  adminBook: null,
  allAuthors: [],
})

export const mutations = {
  setAdminEmail: (state, adminEmail) => {
    state.adminEmail = adminEmail
    if (process.client) {
      localStorage.setItem('adminEmail', adminEmail)
    }
  },
  setAdminBooks: (state, adminBooks) => (state.adminBooks = adminBooks),
  setAdminBook: (state, adminBook) => (state.adminBook = adminBook),
  setAllAuthors: (state, allAuthors) => (state.allAuthors = allAuthors),
}

export const actions = {
  async getAdminBooks({ commit }) {
    const response = await axios.get('https://api.ts-ai-kitkhe.ge/core/books')
    commit('setAdminBooks', response.data)
  },

  async getAdminBookById({ commit }, id) {
    const response = await axios.get(
      `https://api.ts-ai-kitkhe.ge/core/books/${id}`
    )
    commit('setAdminBook', response.data)
  },

  async getAllAuthors({ commit }) {
    const response = await axios.get('/authors.json')
    commit('setAllAuthors', response.data)
  },
}

export const getters = {
  adminEmail: (state) => state.adminEmail ?? localStorage.getItem('adminEmail'),
  allAdminBooks: (state) => state.adminBooks,
  adminBookById: (state) => state.adminBook,
  allAuthors: (state) => state.allAuthors,
}
