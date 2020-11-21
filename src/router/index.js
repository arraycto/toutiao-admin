import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'


Vue.use(VueRouter)



const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: Login,
            component: Login,
            redirect: '/login'

        },
        {
            path: '/login',
            name: Login,
            component: Login
        },
        {
            path: '/home',
            name: Home,
            component: Home
        }
    ]
})

export default router
