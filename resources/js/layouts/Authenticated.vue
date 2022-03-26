<template>
  <main>
    <navigation></navigation>
    <div class="container mx-auto">
      <router-view></router-view>
      <div class="md:flex text-xs text-gray-500 py-8 px-2 md:px-0 break-words">
        <span class="flex">SPA build with <HeartIcon class="h-4 w-4 text-red-500 mx-2"/></span>
        <span> and Laravel, Sanctum, Fortify, Tailwindcss, Vue3, Vuex, Vue-Router.</span>
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
