<template>
  <div>
    <h3 v-if="active" class="text-lg font-medium text-gray-900">You have enabled two factor authentication.</h3>
    <h3 v-else class="text-lg font-medium text-gray-900">You have not enabled two factor authentication.</h3>

    <p class="mt-3 text-sm text-gray-600">
      When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.
    </p>

    <div class="space-x-2 mt-3">
      <button v-if="!active" @click="activate" class="bg-gray-800 text-white p-2 rounded">Activate</button>
      <button v-if="active" @click="loadQrCode" class="bg-gray-800 text-white p-2 rounded">Show QR-Code</button>
      <button v-if="active" @click="loadBackupCodes" class="bg-gray-800 text-white p-2 rounded">Show Backup-Codes</button>
      <button v-if="active" @click="deactivate" class="bg-red-500 text-white p-2 rounded">Deactivate</button>
    </div>

    <div v-if="active && qrCode" v-html="qrCode.svg" class="p-4"></div>

    <div v-if="active && backupCodes" class="grid gap-1 max-w-xl mt-4 p-4 font-mono text-sm bg-gray-100 rounded-lg">
      <div v-for="backupCode in backupCodes" :key="backupCode">{{ backupCode }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backupCodes: null,
      qrCode: null,
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
    deactivate() {
      axios.delete('/user/two-factor-authentication')
        .then((response) => {
          console.log(response)
          this.$store.dispatch('attempt_user')
        })
        .catch((error) => {})
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
    }
  }
}
</script>
