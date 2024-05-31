import axios from '@/api/axios'
import { LoginRequest, LoginResponse } from './types'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        return await axios.post('http://127.0.0.1:8000/api/auth/login', data)
    } catch (error) {
        return Promise.reject(error)
    }
}
