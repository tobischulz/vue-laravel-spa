<template>
  <form ref="passwordUpdateForm" @submit.prevent="updatePassword" class="space-y-6">
    <div>
      <label class="block font-medium text-sm text-gray-500" for="current_password">
        Current Password
      </label>
      <input v-model="data.current_password"
        class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" type="password"
        id="current_password" name="current_password" required="required" autocomplete="current-password">
    </div>
    <div>
      <label class="block font-medium text-sm text-gray-500" for="password">
        New Password
      </label>
      <input v-model="data.password"
        class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" type="password"
        id="password" name="password" required="required" autocomplete="new-password">
    </div>
    <div>
      <label class="block font-medium text-sm text-gray-500" for="password_confirmation">
        Password Confirmation
      </label>
      <input v-model="data.password_confirmation"
        class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" type="password"
        id="password_confirmation" name="password_confirmation" required="required" autocomplete="new-password">
    </div>
    <div v-if="errors" class="text-red-500 py-2 font-semibold">
      <span>{{ errors.message }}</span>
    </div>
    <div class="flex items-center justify-end mt-4">
      <button type="submit"
        class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
        Update
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

export default {
  data() {
    return {
      errors: null,
      data: {
        current_password: null,
        password: null,
        password_confirmation: null,
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['attempt_user']),
    updatePassword() {
      axios.put('/user/password', this.data)
        .then((response) => {
          if (response.status !== 200) return
          this.attempt_user().then(() => {
            this.$refs.passwordUpdateForm.reset()
            this.errors = null
          })
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    },
  }
}
</script>
