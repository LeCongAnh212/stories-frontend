import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router'
import authRouter from '@/router/router.auth'
import homeRouter from './router.home'
import adminRouter from './router.admin'
import authorRouter from './router.author'

const routes: Array<RouteRecordRaw> = [
    ...authRouter,
    ...homeRouter,
    ...adminRouter,
    ...authorRouter
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

// Register global navigation guards to execute the middleware
router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware as NavigationGuard[]
    if (middleware) {
        middleware.forEach((m) => m(to, from, next))
    } else {
        next()
    }
})

export default router
