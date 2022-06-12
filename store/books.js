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
    const response = await axios.get('/books.json')
    commit('setBooks', response.data)
  },

  async getBookById({ commit }, id) {
    const response = await axios.get('/books.json')
    commit('setBook', response.data[id - 1])
  },
}

export const getters = {
  allBooks: (state) => state.books,
  bookById: (state) => state.book,
}
