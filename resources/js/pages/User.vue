<template>
<div class="container mx-auto space-y-2">
  <div class="flex justify-between space-x-2 py-6">
    <div class="w-1/3">
      <h3 class="text-xl">Profil</h3>
      <p class="mt-1 text-sm text-gray-600">
        Update your account's profile information and email address.
      </p>
    </div>
    <div class="w-2/3 p-4 bg-white shadow-md rounded-lg">wip</div>
  </div>

  <div class="flex justify-between space-x-2 py-6">
    <div class="w-1/3">
      <h3 class="text-xl">Password</h3>
      <p class="mt-1 text-sm text-gray-600">
        Ensure your account is using a long, random password to stay secure.
      </p>
    </div>
    <div class="w-2/3 p-4 bg-white shadow-md rounded-lg">wip</div>
  </div>

  <div class="flex justify-between space-x-2 py-6">
    <div class="w-1/3">
      <h3 class="text-xl">Two Factor Authentication</h3>
      <p class="mt-1 text-sm text-gray-600">
        Add additional security to your account using two factor authentication.
      </p>
    </div>
    <two-factore-authentication class="w-2/3 p-4 bg-white shadow-md rounded-lg"></two-factore-authentication>
  </div>
</div>
</template>

<script>
import TwoFactoreAuthentication from '@/js/components/user/TwoFactoreAuthentication'

export default {
  data() {
    return {
      backupCodes: [],
      qrCode: null,
    }
  },
  components: {
    TwoFactoreAuthentication,
  }
}
</script>
