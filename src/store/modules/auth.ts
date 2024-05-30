import { Module } from 'vuex'
import { RootState } from '@/store'
import { FormRegister } from '@/api/modules/auth/types'
import { register } from '@/api/modules/auth'

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
    },
}

export default authModule
