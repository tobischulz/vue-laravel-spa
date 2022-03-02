<template>
    <router-view :key="$route.path"></router-view>
</template>

<script>
import axios from 'axios'
import router from '@/js/router'

export default {
    mounted() {
        axios.interceptors.response.use(response => {
            return response
        }, error => {
             if (error.response.status === 401 || error.response.status === 419) {
                router.push({name: 'Login'})
            } else if (error.response.status === 404) {
                router.push({name: 'NotFound'})
            }
            throw error;
        });
    },
}
</script>