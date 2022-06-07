import axios from 'axios'

export default {
  getBooks({ commit }) {
    axios.get('/books.json').then((response) => {
      commit('SET_BOOKS', response.data)
    })
  },
}
