import axios from 'axios'

export const state = () => ({
  books: [],
  book: null,
})

export const mutations = {
  setBooks: (state, books) => (state.books = books),
  setBook: (state, book) => (state.book = book),
}

export const actions = {
  async getBooks({ commit }) {
    const response = await axios.get('https://api.ts-ai-kitkhe.ge/core/books')
    commit('setBooks', response.data)
  },

  async getBookById({ commit }, id) {
    const response = await axios.get(
      `https://api.ts-ai-kitkhe.ge/core/books/${id}`
    )
    commit('setBook', response.data)
  },
}

export const getters = {
  allBooks: (state) => state.books,
  bookById: (state) => state.book,
}
