<template>
  <main>
    <navigation></navigation>
    <div class="container mx-auto">
      <router-view></router-view>
      <div class="flex text-xs text-gray-500 py-8">
        SPA build with <HeartIcon class="h-4 w-4 text-red-500"/> and Laravel, Sanctum, Fortify, Tailwindcss, Vue3, Vuex, Vue-Router.
      </div>
    </div>
  </main>
</template>

<script>
import Navigation from '@/js/components/Navigation'
import { HeartIcon } from '@heroicons/vue/solid'

export default {
  components: {
    Navigation,
    HeartIcon,
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
}
</script>
