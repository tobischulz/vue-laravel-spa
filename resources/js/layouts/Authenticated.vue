<template>
  <main>
    <navigation></navigation>
    <div class="container mx-auto">
      <router-view></router-view>
      <div class="md:flex text-xs text-gray-500 py-8 px-2 md:px-0 break-words space-x-4">
        <span>SPA build with</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd" />
        </svg>
        <span> and Vue3, Laravel, Sanctum, Fortify, Pinia, Vue-Router and Tailwindcss</span>
        <span><a href="https://github.com/tobischulz/laravel-vue-spa-boilerplate" rel="noopener" target="_blank"
            class="hover:text-gray-400">GitHub</a></span>
      </div>
    </div>
  </main>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation,
  },
}
</script>
