import { createRouter, createWebHistory } from "vue-router";
import store from '@/js/stores'
import NotFound from '@/js/pages/NotFound'
import Guest from '@/js/layouts/Guest'
import Register from '@/js/pages/auth/Register'
import Login from '@/js/pages/auth/Login'
import ForgotPassword from '@/js/pages/auth/ForgotPassword'
import ResetPassword from '@/js/pages/auth/ResetPassword'

import Authenticated from '@/js/layouts/Authenticated'
import Home from '@/js/pages/Home'
import Blog from '@/js/pages/Blog'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Authenticated,
            meta: { requiresAuth: true },
            children: [
                { path: "/", name: 'Home', component: Home },
                { path: "/blog", name: 'Blog', component: Blog },
            ]
        },
        {
            path: '/auth',
            redirect: "/login",
            component: Guest,
            meta: { isGuest: true },
            children: [
                { path: "/register", name: 'Register', component: Register },
                { path: "/login", name: 'Login', component: Login },
                { path: "/forgot-password", name: 'ForgotPassword', component: ForgotPassword },
                { path: "/reset-password/:token", name: 'ResetPassword', component: ResetPassword }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: NotFound,
        }
    ],
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.getters.user) {
        next({name: "Login"})
    } else {
        next();
    }
});

export default router;
