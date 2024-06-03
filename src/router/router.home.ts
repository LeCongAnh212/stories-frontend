import { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layout/defaultLayout.vue'
// import { checkLogin } from '@/middleware/checkLogin'

const homeRouter: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        redirect: '/',
        component: DefaultLayout,
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
