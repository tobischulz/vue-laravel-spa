<template>
  <div>
    <h3 v-if="active" class="text-lg font-medium text-gray-900">You have enabled two factor authentication.</h3>
    <h3 v-else class="text-lg font-medium text-gray-900">You have not enabled two factor authentication.</h3>

    <p class="mt-3 text-sm text-gray-600">
      When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.
    </p>

    <div v-if="qrCode" v-html="qrCode.svg" class="py-4"></div>

    <div v-if="qrCode && !active">
      To activate Two-Factor-Authentication scan the QR-Code and enter here your first TOTP-Code.
      <form @submit.prevent="twoFactorChallenge">
         <div>
            <label class="block font-medium text-sm text-gray-500" for="code">
              TwoFactor Code
            </label>
            <input v-model="code" class="p-2 rounded-md shadow-sm bg-white border border-gray-300 text-gray-400 block mt-1 w-full" id="code" type="text" name="code" required="required">
          </div>
          <div v-if="errors" class="text-red-500 py-2 font-semibold">
            <span>{{ errors.message }}</span>
          </div>
          <div class="flex items-center justify-end mt-4">
            <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
              Activate 2FA
            </button>
          </div>
      </form>
    </div>

    <div v-if="active && backupCodes" class="grid gap-1 max-w-xl mt-4 p-4 font-mono text-sm bg-gray-100 rounded-lg">
      <div v-for="backupCode in backupCodes" :key="backupCode">{{ backupCode }}</div>
    </div>

    <div class="space-x-2 mt-3">
      <button v-if="!active" @click="activate" class="bg-gray-800 text-white p-2 rounded">Activate</button>
      <button v-if="active" @click="loadQrCode" class="bg-gray-800 text-white p-2 rounded">Show QR-Code</button>
      <button v-if="active" @click="loadBackupCodes" class="bg-gray-800 text-white p-2 rounded">Show Backup-Codes</button>
      <button v-if="active" @click="deactivate" class="bg-red-500 text-white p-2 rounded">Deactivate</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backupCodes: null,
      qrCode: null,
      errors: null,
      code: null,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    active() {
      return this.user.two_factor
    }
  },
  methods: {
    activate() {
      axios.post('/user/two-factor-authentication')
        .then((response) => {
          console.log(response)
          this.$store.dispatch('attempt_user')
            .then(() => {
              this.loadQrCode()
            })
        })
        .catch((error) => {})
    },
    twoFactorChallenge() {
       axios.post('/user/confirmed-two-factor-authentication', {code: this.code})
        .then((response) => {
           this.$store.dispatch('attempt_user')
        })
        .catch((error) => {
          this.errors = error.response.data
        })
    },
    loadQrCode() {
      axios.get('/user/two-factor-qr-code')
        .then((response) => {
          this.qrCode = response.data
        })
        .catch((error) => {})
    },
    loadBackupCodes() {
      axios.get('/user/two-factor-recovery-codes')
        .then((response) => {
          this.backupCodes = response.data
        })
        .catch((error) => {})
    },
    deactivate() {
      axios.delete('/user/two-factor-authentication')
        .then((response) => {
          this.$store.dispatch('attempt_user')
        })
        .catch((error) => {})
    },
  }
}
</script>
