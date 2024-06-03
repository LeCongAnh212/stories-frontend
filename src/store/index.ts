import { Store } from 'vuex'
import authModule from './modules/auth'
import loadingModule from './modules/loading'
import { AuthState } from '@/types'

export interface RootState {
    auth: AuthState
}

const store: Store<RootState> = createStore({
    modules: {
        auth: authModule,
        loading: loadingModule,
    },
})

export default store
