import axios from '@/api/axios'
import { LoginRequest, LoginResponse } from './types'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        return await axios.post('/login', data)
    } catch (error) {
        return Promise.reject(error)
    }
}
