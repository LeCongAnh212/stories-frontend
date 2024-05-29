import { Module } from 'vuex'

import { RootState } from '@/store'

const authModule: Module<RootState> = {
    namespaced: true,
    
}

export default authModule
