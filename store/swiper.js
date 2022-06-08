import axios from 'axios'

export const state = () => ({
  swiperCards: [],
})

export const mutations = {
  setSwiperCards: (state, swiperCards) => (state.swiperCards = swiperCards),
}

export const actions = {
  async getSwiperCards({ commit }) {
    const response = await axios.get('http://localhost:3000/books.json')
    commit('setSwiperCards', response.data)
  },
}

export const getters = {
  allSwiperCards: (state) => state.swiperCards,
}
