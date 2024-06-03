import axios from '@/api/axios'
import { DetailAuthorResponse, FormAuthorData } from './types'

const resource = '/authors'
const headers = {
    'Content-Type': 'multipart/form-data',
}

export const authors = {
    create: (data: FormAuthorData): Promise<DetailAuthorResponse> => axios.post(`${resource}/register`, data, { headers }),
}
