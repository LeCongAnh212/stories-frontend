import { Module } from 'vuex'
import { RootState } from '@/store'
import { FormRegister } from '@/api/modules/auth/types'
import { register, resendEmail } from '@/api/modules/auth'

const authModule: Module<RootState> = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async register({}, payload: FormRegister) {
            try {
                await register(payload)
            } catch (error) {
                console.log('error: ', error)
            }
        },
        async resendEmail({}, payload: FormRegister) {
            try {
                await resendEmail(payload)
            } catch (error) {
                console.log('error: ', error)
            }
        },
    },
}

export default authModule
