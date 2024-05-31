<template>
  <div class="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 p-4">
    <logo></logo>

    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
      <form @submit.prevent="resetPassword">
        <div>
          <label class="block font-medium text-sm text-gray-500" for="email">
            Email
          </label>
          <input v-model="data.email"
            class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" id="email"
            type="email" name="email" required="required" autofocus="autofocus">
        </div>
        <div class="mt-4">
          <label class="block font-medium text-sm text-gray-500" for="password">
            Password
          </label>
          <input v-model="data.password"
            class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 block mt-1 w-full"
            id="password" type="password" name="password" required="required" autocomplete="current-password">
        </div>
        <div class="mt-4">
          <label class="block font-medium text-sm text-gray-500" for="password_confirmation">
            Password Confirmation
          </label>
          <input v-model="data.password_confirmation"
            class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 block mt-1 w-full"
            id="password_confirmation" type="password" name="password_confirmation" required="required"
            autocomplete="current-password">
        </div>
        <div v-if="errors" class="text-red-500 py-2 font-semibold">
          <span>{{ errors.message }}</span>
        </div>
        <div class="flex items-center justify-end mt-4">
          <button type="submit"
            class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  data: () => {
    return {
      errors: null,
      data: {
        email: null,
        password: null,
        password_confirmation: null,
      },
    }
  },
  components: {
    Logo,
  },
  methods: {
    resetPassword() {
      this.errors = null
      axios.post('/reset-password', { ...this.data, ...{ token: this.$route.params.token } })
        .then((response) => {
          console.log(response)
          router.push({ name: 'Home' })
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    }
  }
}
</script>
