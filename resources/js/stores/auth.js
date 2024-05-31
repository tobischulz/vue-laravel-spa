import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    set_user(user) {
      this.user = user
    },
    async attempt_user() {
      return axios.get('/api/v1/me')
        .then((response) => {
          this.user = response.data.data
          return response
        })
        .catch((error) => {
          this.user = null
          throw error
        })
    },
    async logout() {
      return axios.post('/logout')
        .then((response) => {
          this.$reset()
        })
        .catch((error) => {
          console.error(error)
          throw error
        })
    },
  },
  getters: {
    currentUser: (state) => state.user,
  },
})
