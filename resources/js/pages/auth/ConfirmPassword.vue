<template>
  <div class="flex flex-col justify-center items-center pt-6 sm:pt-0 p-4">
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
      <h3 class="text-lg font-medium text-gray-900">Confirm your Password</h3>
      <p class="mt-3 text-sm text-gray-600">You need to confirm your password in order to perform the requested action.
        After confirmation you can retry your action.</p>
      <form @submit.prevent="confirm">
        <div class="mt-4">
          <label class="block font-medium text-sm text-gray-500" for="password">
            Password
          </label>
          <input v-model="password"
            class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 block mt-1 w-full"
            id="password" type="password" name="password" required="required" autocomplete="current-password">
        </div>
        <div v-if="errors" class="text-red-500 py-2 font-semibold">
          <span>{{ errors.message }}</span>
        </div>
        <div class="flex items-center justify-end mt-4">
          <button type="submit"
            class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: null,
      errors: null,
    }
  },
  methods: {
    confirm() {
      this.errors = null
      axios.post('/user/confirm-password', { password: this.password })
        .then((response) => {
          this.$router.back()
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    }
  }
}
</script>
