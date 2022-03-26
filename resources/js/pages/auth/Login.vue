<template>
<div class="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 p-4">
    <router-link :to="{name: 'Login'}" class="flex items-center space-x-1 pt-8 sm:justify-start sm:pt-0 text-xl text-gray-800 font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
        <span>Laravel Sanctum Vue SPA</span>
    </router-link>

    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-100 shadow-md overflow-hidden rounded-lg">
        <form @submit.prevent="login">
            <div>
                <label class="block font-medium text-sm text-gray-500" for="email">
                    Email
                </label>
                <input v-model="data.email" class="p-2 rounded-md shadow-sm bg-white border-gray-900 text-gray-400 block mt-1 w-full" id="email" type="email" name="email" required="required" autofocus="autofocus">
            </div>
            <div class="mt-4">
                <label class="block font-medium text-sm text-gray-500" for="password">
                    Password
                </label>
                <input v-model="data.password" class="p-2 rounded-md shadow-sm bg-white border-gray-900 text-gray-400 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 block mt-1 w-full" id="password" type="password" name="password" required="required" autocomplete="current-password">
            </div>
            <div v-if="errors" class="text-red-500 py-2 font-semibold">
                <span>{{ errors.message }}</span>
            </div>
            <div class="block mt-4">
                <label for="remember" class="inline-flex items-center">
                    <input v-model="data.remember" id="remember" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember">
                    <span class="ml-2 text-sm text-gray-500">Remember me</span>
                </label>
            </div>
            <div class="flex items-center justify-end mt-4">
                <router-link class="underline text-sm text-gray-500 hover:text-gray-200" :to="{name: 'ForgotPassword'}">
                    Forgot your password?
                </router-link>
                <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
                    Log in
                </button>
            </div>
        </form>
    </div>
    <div class="text-center text-sm mt-4">
        Don't have an account yet?
        <router-link class="underline text-gray-500 hover:text-gray-200" :to="{name: 'Register'}">
            Sign up now
        </router-link>
    </div>
</div>
</template>

<script>
import router from '@/js/router'
import store from '@/js/stores'

export default {
    data: () => {
        return {
            data: {
                email: null,
                password: null,
                remember: null,
            },
            errors: null
        }
    },
    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/login', this.data)
                    .then((response) => {
                        store.dispatch('attempt_user')
                            .then(() => {
                                router.replace({name: 'Home'})
                            })
                    })
                    .catch((error) => {
                        this.errors = error.response.data
                    })
            });
        }
    }
}
</script>
