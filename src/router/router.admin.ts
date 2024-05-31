import { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layout/defaultLayout.vue'
import { checkLogin } from '@/middleware/checkLogin'

const adminRouter: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        component: DefaultLayout,
        meta: {
            middleware: [checkLogin],
        },
        children: [
            {
                path: '/admin',
                name: 'dashboard_admin',
                component: () => import('@/views/admin/dashboard/index.vue'),
            },
        ],
    },
]

export default adminRouter
