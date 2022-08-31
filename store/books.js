import axios from 'axios'

export const state = () => ({
  books: [],
  book: null,
  bookData: null,
  confidences: [],
})

export const mutations = {
  setBooks: (state, books) => (state.books = books),
  setBook: (state, book) => (state.book = book),
  setBookData: (state, bookData) => (state.bookData = bookData),
  setConfidences: (state, confidences) => (state.confidences = confidences),
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

  async getBookDataById({ commit }, id) {
    await axios
      .get(`https://api.ts-ai-kitkhe.ge/ml/books/${id}`)
      .then((response) => commit('setBookData', response.data))
      .catch((_) => commit('setBookData', null))
  },

  async getConfidences({ commit }) {
    const response = await axios.get('https://api.ts-ai-kitkhe.ge/ml/books')
    commit('setConfidences', response.data)
  },
}

export const getters = {
  allBooks: (state) => state.books,
  bookById: (state) => state.book,
  bookDataById: (state) => state.bookData,
  allConfidences: (state) => state.confidences,
}
