<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>
import axios from 'axios'
import router from '@/js/router'
import store from '@/js/stores'

export default {
  mounted() {
    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status === 401 || error.response.status === 419) {
        store.dispatch('logout')
        router.push({name: 'Login'})
      } else if(error.response.status === 403) {
        router.push({name: 'VerifyEmail'})
      } else if(error.response.status === 423) {
        router.push({name: 'ConfirmPassword'})
      }

      return Promise.reject(error);
    });
  },
}
</script>
