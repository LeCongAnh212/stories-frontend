import { Module } from 'vuex'
import { RootState } from '@/store'
import { AuthState } from '@/types'
import { login } from '@/api/modules/auth'

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        access_token: null,
        user: null,
    },
    mutations: {
        setUserProfile(state, user) {
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },

        setAccessToken(state, token) {
            state.access_token = token
            localStorage.setItem('access_token', token)
        },
        logout(state) {
            state.access_token = null
            state.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const auth = await login(credentials)
                console.log("🚀 ~ login ~ auth:", auth)
                commit('setUserProfile', auth.user)
                console.log(localStorage.getItem('user'))
                commit('setAccessToken', auth.access_token) 

                return auth
            } catch (error) {
                return Promise.reject(error)
            }
        },
        setAccessToken ({ commit }, token) {
            commit('setAccessToken', token)
        },
        setUserProfile ({ commit }, user) {
            commit('setUserProfile', user)
        },
        logout({ commit }) {
            commit('logout')
        },
    },
    getters: {
        isLoggedIn(state) {
            return !!state.access_token
        },
        currentUser(state) {
            return state.user
        },
    },
}

export default authModule