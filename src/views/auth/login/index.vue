<template>
    <div v-if="show" class="flex bg-[#1B1B1B] bg-opacity-60 fixed inset-0 z-10">
        <div
            class="modal w-full h-full md:w-1/3 md:h-[600px] bg-white md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 absolute rounded-lg p-10"
        >
            <button @click="closeForm" class="hidden md:flex absolute right-2 top-2">✕</button>
            <div class="form w-full">
                <form @submit.prevent="handleLogin">
                    <p class="text-black text-center text-body-l">Đăng nhập</p>
                    <div class="input mt-8 text-body-s">
                        <label class="text-body-s">Email</label>
                        <base-input-field
                            v-model="state.email"
                            id="email"
                            type="email"
                            field-name="email"
                            placeholder="Nhập email"
                            class="mb-2"
                            rules="required|email"
                            :error="errorMsg.email"
                            :isFocus="hasEmailError"
                        />

                        <label class="">Mật khẩu</label>
                        <base-input-field
                            v-model="state.password"
                            id="password"
                            type="password"
                            field-name="password"
                            placeholder="Nhập mật khẩu"
                            rules="required|min:8|max:20"
                        />
                    </div>
                    <base-button size="sm" class="w-full mt-8 py-6" type="submit">
                        Đăng nhập
                    </base-button>
                </form>
            </div>
            <div class="text-center mt-8">
                <p>
                    Bạn chưa có tài khoản?
                    <router-link to="{ name: 'register' }">Đăng ký ngay</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { LoginRequest } from '@/api/modules/auth/types'
import { clearObject, isObjectEmpty } from '@/utils/helper'
import { useForm } from 'vee-validate'
import { USER_ROLE } from '@/constants'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const props = defineProps(['show'])
const emit = defineEmits(['close'])
const closeForm = () => {
    emit('close')
}

const hasEmailError = ref(false)
const router = useRouter()

const state = reactive({
    email: undefined,
    password: undefined,
    show_password: false,
    remember_me: false,
})

const errorMsg: LoginRequest = reactive({
    email: '',
    password: '',
})
const { validate, errors } = useForm()
const store = useStore()
const hasErrors = ref(false)

const setLoading = () => store.dispatch('loading/setLoading')
const removeLoading = () => store.dispatch('loading/removeLoading')

watch(errors, (newErrors) => {
    hasErrors.value = isObjectEmpty(newErrors)
})

const handleLogin = async () => {
    const { valid } = await validate()

    if (!valid) {
        return false
    }

    try {
        clearObject(errorMsg)
        await store.dispatch('auth/login', state)
        const currentUser = store.getters['auth/currentUser']
        if (currentUser && currentUser.role) {
            if (currentUser.role == USER_ROLE.ADMIN) {
                router.push({ name: 'dashboard_admin' })
            } else if (currentUser.role == USER_ROLE.AUTHOR) {
                router.push({ name: 'dashboard_author' })
            } else if (currentUser.role == USER_ROLE.USER) {
                router.push({ name: 'home' })
            }
        } else {
            router.push({ name: 'home' })
        }
        closeForm()
    } catch (error: any) {
        if (error.email) {
            errorMsg.email = error.email
            hasEmailError.value = true
        } else {
            showToast(error.message, ToastType.ERROR)
        }
    }
}

onMounted(async () => {
    setLoading()
    removeLoading()
})
</script>
