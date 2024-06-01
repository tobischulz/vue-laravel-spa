<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>
import axios from 'axios'
import router from '@/router'
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

export default {
  methods: {
    ...mapActions(useAuthStore, ['logout']),
  },
  mounted() {
    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      console.error(error)
      if (error.response.status === 401 || error.response.status === 419) {
        if (error.response.data.message === 'CSRF token mismatch.') return
        this.logout()
          .catch((error) => { console.error(error) })
        router.replace({ name: 'Login' })
      } else if (error.response.status === 403) {
        router.push({ name: 'VerifyEmail' })
      } else if (error.response.status === 423) {
        router.push({ name: 'ConfirmPassword' })
      }

      return Promise.reject(error);
    });
  },
}
</script>
