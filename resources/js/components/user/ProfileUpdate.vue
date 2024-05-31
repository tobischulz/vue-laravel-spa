<template>
  <form @submit.prevent="update" class="space-y-6">
    <div>
      <label class="block font-medium text-sm text-gray-500" for="name">
        Name
      </label>
      <input v-model="data.name"
        class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" type="text"
        id="name" name="name" required="required">
    </div>
    <div>
      <label class="block font-medium text-sm text-gray-500" for="email">
        Email
      </label>
      <input v-model="data.email"
        class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" type="email"
        id="email" name="email" required="required">
    </div>
    <div v-if="errors" class="text-red-500 py-2 font-semibold">
      <span>{{ errors.message }}</span>
    </div>
    <div class="flex items-center justify-end mt-4">
      <button type="submit"
        class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
        Update
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

export default {
  data() {
    return {
      errors: null,
      data: {
        name: null,
        email: null,
      }
    }
  },
  mounted() {
    this.data.name = this.user.name
    this.data.email = this.user.email
  },
  computed: {
    ...mapStores(useAuthStore),
    user() {
      return this.authStore.currentUser
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['attempt_user']),
    update() {
      axios.put('/user/profile-information', this.data)
        .then((response) => {
          this.attempt_user()
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    },
  }
}
</script>
