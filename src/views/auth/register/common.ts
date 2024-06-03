import { FormRegister } from '@/api/modules/auth/types'

const user: FormRegister = reactive({
    email: '',
    username: '',
    password: '',
    full_name: '',
})

export { user }
