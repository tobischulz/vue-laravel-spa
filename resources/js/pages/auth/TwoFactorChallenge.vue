<template>
  <div class="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 p-4">
    <logo></logo>

    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
      <form @submit.prevent="login">
        <div>
          <label class="block font-medium text-sm text-gray-500" for="code">
            TwoFactor Code
          </label>
          <input v-model="code"
            class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" id="code"
            type="text" name="code" required="required" autofocus="autofocus">
        </div>
        <div v-if="errors" class="text-red-500 py-2 font-semibold">
          <span>{{ errors.message }}</span>
        </div>
        <div class="flex items-center justify-end mt-4">
          <button type="submit"
            class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import Logo from '@/components/Logo.vue'

export default {
  data() {
    return {
      code: null,
      errors: null,
    }
  },
  components: {
    Logo,
  },
  methods: {
    ...mapActions(useAuthStore, ['attempt_user']),
    login() {
      this.errors = null
      axios.post('/two-factor-challenge', { code: this.code, recovery_code: this.code })
        .then((response) => {
          if (response.status !== 204) return

          this.attempt_user()
            .then(() => {
              this.$router.replace({ name: 'Home' })
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    }
  }
}
</script>
