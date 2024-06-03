import { RouteRecordRaw } from 'vue-router'
import BaseLayout from '@/layout/baseLayout.vue'
// import { checkLogin } from '@/middleware/checkLogin'

const homeRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        redirect: '/',
        component: BaseLayout,
        meta: {
            // middleware: [checkLogin],
        },
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
            },
        ],
    },
]

export default homeRouter
