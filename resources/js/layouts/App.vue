<template>
    <router-view :key="$route.path"></router-view>
</template>

<script>
import axios from 'axios'
import router from '@/js/router'

export default {
    mounted() {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401 || error.response.status === 419) {
                router.push({name: 'Login'})
            }

            return Promise.reject(error);
        });
    },
}
</script>