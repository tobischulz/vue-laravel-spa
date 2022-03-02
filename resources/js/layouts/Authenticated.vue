<template>
    <main>
        <div class="container mx-auto">
            <navigation></navigation>
            <router-view></router-view>
            <div class="text-sm text-gray-800 py-8">
                Laravel, Sanctum, Fortify, Tailwindcss, Vue3, Vuex, Vue-Router.
            </div>
        </div>
    </main>
</template>

<script>
import Navigation from '@/js/components/Navigation'
import store from '@/js/stores'

export default {
    components: { 
        Navigation,
    },
    computed: {
        user() {
            return store.getters.user
        }
    },
}
</script>
