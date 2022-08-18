import axios from 'axios'

export const state = () => ({
  swiperCards: [],
})

export const mutations = {
  setSwiperCards: (state, swiperCards) => (state.swiperCards = swiperCards),
}

export const actions = {
  async getSwiperCards({ commit }) {
    const response = await axios.get('https://api.ts-ai-kitkhe.ge/core/books', {
      params: { limit: 10 },
    })
    commit('setSwiperCards', response.data)
  },
}

export const getters = {
  allSwiperCards: (state) => state.swiperCards,
}
