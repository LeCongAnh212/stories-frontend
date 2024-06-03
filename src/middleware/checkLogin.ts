import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '@/store'
import { USER_ROLE } from '@/constants'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'
import i18n from '@/i18n'

export async function checkLogin(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> {
    const excludedRoutes = ['forgot_password', 'reset_password', 'reset_password_send_mail']
    const router = useRouter()
    const isLoggedIn = store.getters['auth/isLoggedIn']

    if (excludedRoutes.includes(to.name as string) && !isLoggedIn) {
        next()
        return
    }

    if (isLoggedIn) {
        if (to.name === 'login' || excludedRoutes.includes(to.name as string)) {
            return next({ name: 'login' })
        }

        const currentUser = store.getters['auth/currentUser']
        const userRole = currentUser.role

        if (to.name === 'dashboard_admin' && userRole != USER_ROLE.ADMIN) {
            showToast(i18n.global.t('common.unauthorized'), ToastType.ERROR)

            return next({ name: 'page_unauthorized' })
        }

        if (
            to.name === 'dashboard_author' &&
            userRole != USER_ROLE.AUTHOR &&
            userRole != USER_ROLE.ADMIN
        ) {
            showToast(i18n.global.t('common.unauthorized'), ToastType.ERROR)

            return next({ name: 'page_unauthorized' })
        }

        next()
    } else {
        if (to.name === 'login') {
            return next()
        }
    }
}
