<template>
  <nav class="bg-white border-b border-gray-200 p-4 mb-4">
    <div class="container mx-auto flex justify-center md:justify-between">
      <router-link :to="{ name: 'Home' }" class="hidden md:flex text-xl font-semibold place-items-center space-x-2">
        <span>Vue Laravel SPA</span>
      </router-link>
      <ul class="list flex items-center text-gray-500 text-sm font-semibold">
        <li>
          <router-link :to="{ name: 'Home' }" class="hover:text-gray-700 p-2 rounded flex items-center space-x-2">
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'User' }"
            class="hover:text-gray-700 p-2 rounded flex items-center space-x-2 font-semibold">
            <span>{{ currentUser?.name }}</span>
          </router-link>
        </li>
        <li class="ml-4">
          <button @click="logoutUser" class="hover:text-gray-700 p-2 rounded flex items-center space-x-2">
            <span>logout</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

export default {
  computed: {
    ...mapStores(useAuthStore),
    currentUser() {
      return this.authStore?.currentUser
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    logoutUser() {
      this.logout()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
    },
  },
}
</script>
