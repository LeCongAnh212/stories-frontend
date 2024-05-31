import { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layout/defaultLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'

const authorRouter: Array<RouteRecordRaw> = [
    {
        path: '/author',
        component: DefaultLayout,
        meta: {
            middleware: [checkLogin],
        },
        children: [
            {
                path: '/author',
                name: 'dashboard_author',
                component: () => import('@/views/author/dashboard/index.vue'),
            },
        ],
    },
]

export default authorRouter
