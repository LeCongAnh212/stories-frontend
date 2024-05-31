import { POSITION } from 'vue-toastification'
import { ToastType } from './toastMessage'
import { USER_ROLE } from '@/constants/user'

// eslint-disable-next-line no-unused-vars
export type ShowToastFunction = (message: string, type: ToastType) => void
export type ShowToastImportFunction = (
    message: string,
    type: ToastType,
    position: POSITION | undefined
) => void

export interface ResponseError {
    code: number
    message: string
    errors: {
        [key: string]: string
    }
    code_error?: string
}

export interface ResponseSuccess {
    code: number
    message: string
    data: object
}

export interface ResponseSuccessNoContent {
    code: number
    message: string
}

export interface LoadingState {
    isLoading: boolean
}

export interface AuthState {
    access_token: string | null
    user: UserDetail | null
}
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]

export interface UserDetail {
    id: number
    username: string
    email: string
    role: UserRole
}
