import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'


Vue.use(VueRouter)



const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: Login,
            component: Login
        },
        //layout作为布局容器,把home放到layout的子路由下面显示
        {
            path: '/',

            component: Layout,
            children: [
                {
                    path: '', //path位空，会作为默认子路由
                    name: Home,
                    component: Home
                }
            ]
        },
    ]
})

export default router
