import axios from 'axios'

export const state = () => ({
  adminEmail: null,
  adminBooks: [],
  adminBook: null,
  allAuthors: [],
  adminBookPages: [],
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
  setAdminBookPages: (state, adminBookPages) =>
    (state.adminBookPages = adminBookPages),
  addNewAdminBook: (state, newBook) => state.adminBooks.unshift(newBook),
  deleteAdminBook: (state, bookId) =>
    (state.adminBooks = state.adminBooks.filter((book) => book.Id !== bookId)),

  updateAdminBook: (state, updatedBook) => {
    state.adminBooks.forEach((book) => {
      if (book.Id === updatedBook.Id) {
        for (const key of Object.keys(updatedBook)) {
          book[key] = updatedBook[key]
        }
      }
    })
  },
}

export const actions = {
  async getAdminBooks({ commit }) {
    const response = await axios.get(
      'https://api.ts-ai-kitkhe.ge/core/admin/books',
      {
        headers: {
          authorization:
            'Bearer ' +
            this.$auth.strategies.cognito.token.session.idToken.jwtToken,
        },
      }
    )
    commit('setAdminBooks', response.data)
  },

  async getAdminBookById({ commit }, id) {
    const response = await axios.get(
      `https://api.ts-ai-kitkhe.ge/core/books/${id}`
    )
    commit('setAdminBook', response.data)
  },

  async getAllAuthors({ commit }) {
    const response = await axios.get('https://api.ts-ai-kitkhe.ge/core/authors')
    commit('setAllAuthors', response.data)
  },

  async getAdminBookPages({ commit }, id) {
    const response = await axios.get(
      `https://api.ts-ai-kitkhe.ge/core/admin/books/${id}/pages`
    )
    commit('setAdminBookPages', response.data)
  },
}

export const getters = {
  adminEmail: (state) => state.adminEmail ?? localStorage.getItem('adminEmail'),
  allAdminBooks: (state) => state.adminBooks,
  adminBookById: (state) => state.adminBook,
  allAuthors: (state) => state.allAuthors,
  adminBookPages: (state) => state.adminBookPages,
}
