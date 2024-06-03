import { POSITION } from 'vue-toastification'
import { ToastType } from './toastMessage'

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

export interface Genre {
    id: number
    name_genre: string
    // cover_img: string
}

export interface Story {
    id: number
    title: string
    cover_image: string
    views?: number
    author?: string
}

export interface AuthState {}
