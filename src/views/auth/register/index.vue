<template>
    <div class="p-4 bg-gray-100 h-full relative flex flex-col items-center gap-3 text-gray-600">
        <div class="w-5 h-5 absolute top-4 left-4 cursor-pointer" @click="$router.back()">
            <BaseIcon name="arrowLeft" stroke="white" fill="white" :isActiveHover="true" />
        </div>

        <strong class="mb-20 text-3xl">Register Account</strong>

        <div class="lg:w-1/3 md:w-1/2 w-full flex flex-col items-center gap-3">
            <p class="text-2xl">Create a free account</p>

            <div>
                <div class="relative">
                    <div class="rounded-full bg-main-primary-300 w-20 h-20 flex items-center overflow-hidden">
                        <img
                            :src="URLImage ?? '../../assets/img/default_avatar.png'"
                            class="object-cover w-full h-full"
                            alt="avatar"
                        />
                    </div>
                    <label htmlFor="abc" class="absolute cursor-pointer bottom-1 right-1 w-5 h-5 text-gray-300">
                        <BaseIcon name="photo" />
                        <BaseInput
                            id="abc"
                            @change="onFileChange"
                            fieldName="avatar"
                            type="file"
                            accept="image/*"
                            class="mt-1 border-blue-300 hidden"
                        >
                        </BaseInput>
                    </label>
                </div>
            </div>
            <div class="w-full relative">
                <label for="" class="text-left">Email:</label>
                <BaseInput
                    id="a"
                    v-model="user.email"
                    fieldName="email"
                    placeholder="email"
                    type="email"
                    class="mt-1 border-blue-300"
                    :error="errors.email"
                    @keyup.enter="register"
                >
                </BaseInput>
                <span v-show="errors.email && isSubmit" class="text-red-500 absolute text-[0.7rem]">
                    {{ errors.email }}
                </span>
            </div>
            <div class="w-full">
                <label for="" class="text-left">Username:</label>
                <BaseInput
                    id="b"
                    v-model="user.username"
                    fieldName="username"
                    placeholder="username"
                    class="mt-1 border-blue-300"
                    :error="errors.username"
                    @keyup.enter="register"
                >
                </BaseInput>
                <span v-show="errors.username && isSubmit" class="text-red-500 absolute text-[0.7rem]">
                    {{ errors.username }}
                </span>
            </div>
            <div class="w-full relative">
                <label for="" class="text-left">Password:</label>
                <BaseInput
                    id="c"
                    v-model="user.password"
                    fieldName="password"
                    placeholder="password"
                    :type="!showPassword ? 'password' : 'text'"
                    class="mt-1 border-blue-300 [&>input]:pe-10"
                    :error="errors.password"
                    @keyup.enter="register"
                >
                </BaseInput>
                <div
                    class="absolute w-5 right-2 top-1/2 translate-y-1/2 cursor-pointer"
                    @click="showPassword = !showPassword"
                >
                    <BaseIcon :name="showPassword ? 'eye' : 'eyeSlash'" />
                </div>
                <span v-show="errors.password && isSubmit" class="text-red-500 absolute text-[0.7rem]">
                    {{ errors.password }}
                </span>
            </div>
            <div class="w-full">
                <label for="" class="text-left">Fullname:</label>
                <BaseInput
                    id="d"
                    v-model="user.full_name"
                    fieldName="fullname"
                    placeholder="fullname"
                    :rules="['required', 'email']"
                    class="mt-1 border-blue-300"
                    :error="errors.fullname"
                    @keyup.enter="register"
                >
                </BaseInput>
                <span v-show="errors.fullname && isSubmit" class="text-red-500 absolute text-[0.7rem]">
                    {{ errors.fullname }}
                </span>
            </div>

            <div class="mt-3 flex flex-col items-center">
                <div>
                    <el-button
                        :disabled="isLoadingButton"
                        :class="isLoadingButton ? 'cursor-not-allowed' : ''"
                        type="info"
                        round
                        @click="resendEmail()"
                    >
                        Resend email
                    </el-button>
                    <el-button
                        :disabled="isLoadingButton"
                        :class="isLoadingButton ? 'cursor-not-allowed' : ''"
                        type="primary"
                        round
                        @click="register()"
                    >
                        Register
                    </el-button>
                </div>
                <p class="text-sm mt-2">
                    Do you already have an account?
                    <router-link :to="{ name: 'login' }">
                        <span class="text-main-primary-300 hover:text-main-primary-400 hover:underline cursor-pointer">
                            Login now
                        </span>
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { user } from './common'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import i18n from '@/i18n'
import { showToast, showError } from '@/utils'
import { ToastType } from '@/types'

const { t } = i18n.global
const store = useStore()

const URLImage = ref('../src/assets/img/default_avatar.png')
const isSubmit = ref(false)
const isLoadingButton = ref(false)
const showPassword = ref(false)

const { errors } = useForm({
    validationSchema: yup.object({
        email: yup
            .string()
            .email(t('validation.email', { field: 'email' }))
            .required(t('validation.required', { field: 'email' })),
        username: yup.string().required(t('validation.required', { field: 'username' })),
        password: yup.string().required(t('validation.required', { field: 'password' })),
        fullname: yup.string().required(t('validation.required', { field: 'fullname' })),
    }),
})

const register = async () => {
    try {
        isLoadingButton.value = true
        isSubmit.value = true

        if (errors.value && Object.keys(errors.value).length > 0) return

        const check = await store.dispatch('auth/register', user)

        if (check) showToast(t('user.created_success'), ToastType.SUCCESS)
    } catch (error) {
        showError(error)
    } finally {
        isLoadingButton.value = false
    }
}
function onFileChange(event) {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
        URLImage.value = URL.createObjectURL(file)
        user.avatar = file
    }
}
const resendEmail = async () => {
    try {
        isLoadingButton.value = true
        isSubmit.value = true

        if (errors.value && Object.keys(errors.value).length > 0) return

        await store.dispatch('auth/resendEmail', user)
    } catch (error) {
        showError(error)
    } finally {
        isLoadingButton.value = false
    }
}
</script>

<style></style>
