<template>
  <div class="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 p-4">
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
      <h3 class="text-lg font-medium text-gray-900">Verify Email Address</h3>

      <p class="text-sm text-gray-600 py-2">Thanks for signing up! Before getting started, could you verify your email
        address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you
        another.</p>

      <form @submit.prevent="resendVerification">
        <div v-if="errors" class="text-red-500 py-2 font-semibold">
          <span>{{ errors.message }}</span>
        </div>
        <div class="flex items-center justify-end mt-4">
          <button type="submit"
            class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
            Resend Verification Email
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
      errors: null,
    }
  },
  methods: {
    resendVerification() {
      this.errors = null
      axios.post('/email/verification-notification')
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    }
  }
}
</script>
