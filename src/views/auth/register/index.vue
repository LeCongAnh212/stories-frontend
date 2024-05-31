<template>
    <div class="p-4 bg-gray-100 h-full relative flex flex-col items-center gap-3 text-gray-600">
        <div class="w-5 h-5 absolute top-4 left-4 cursor-pointer" @click="$router.back()">
            <BaseIcon name="arrowLeft" stroke="white" fill="white" :isActiveHover="true" />
        </div>

        <strong class="mb-20">Register Account</strong>

        <div class="lg:w-1/3 md:w-1/2 w-full flex flex-col items-center gap-3">
            <p>Create a free account</p>

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
                    v-model="user.email"
                    fieldName="email"
                    placeholder="email"
                    type="email"
                    class="mt-1 border-blue-300"
                    :error="errors.email"
                >
                </BaseInput>
                <span v-show="errors.email && isSubmit" class="text-red-500 absolute text-[0.7rem]">
                    {{ errors.email }}
                </span>
            </div>
            <div class="w-full">
                <label for="" class="text-left">Username:</label>
                <BaseInput
                    v-model="user.username"
                    fieldName="username"
                    placeholder="username"
                    class="mt-1 border-blue-300"
                    :error="errors.username"
                >
                </BaseInput>
                <span v-show="errors.username && isSubmit" class="text-red-500 absolute text-[0.7rem]">
                    {{ errors.username }}
                </span>
            </div>
            <div class="w-full">
                <label for="" class="text-left">Password:</label>
                <BaseInput
                    v-model="user.password"
                    fieldName="password"
                    placeholder="password"
                    type="password"
                    class="mt-1 border-blue-300"
                    :error="errors.password"
                >
                </BaseInput>
                <span v-show="errors.password && isSubmit" class="text-red-500 absolute text-[0.7rem]">
                    {{ errors.password }}
                </span>
            </div>
            <div class="w-full">
                <label for="" class="text-left">Fullname:</label>
                <BaseInput
                    v-model="user.full_name"
                    fieldName="fullname"
                    placeholder="fullname"
                    :rules="['required', 'email']"
                    class="mt-1 border-blue-300"
                    :error="errors.fullname"
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
                <p>
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

    <BaseToastMessage content="Hello" />
</template>

<script setup lang="ts">
import { user } from './common'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import i18n from '@/i18n'
import {} from '@/utils'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const store = useStore()

const URLImage = ref('../src/assets/img/default_avatar.png')
const isSubmit = ref(false)
const isLoadingButton = ref(false)

const { errors } = useForm({
    validationSchema: yup.object({
        email: yup
            .string()
            .email(i18n.global.t('validation.email', { field: 'email' }))
            .required(i18n.global.t('validation.required', { field: 'email' })),
        username: yup.string().required(i18n.global.t('validation.required', { field: 'username' })),
        password: yup.string().required(i18n.global.t('validation.required', { field: 'password' })),
        fullname: yup.string().required(i18n.global.t('validation.required', { field: 'fullname' })),
    }),
})

const register = async () => {
    try {
        // isLoadingButton.value = true
        // isSubmit.value = true

        // if (errors.value && Object.keys(errors.value).length > 0) {
        //     return
        // }

        // await store.dispatch('auth/register', user)

        // isLoadingButton.value = false
        showToast('This is a success message', ToastType.SUCCESS)
    } catch (error) {
        console.log('error: ', error)
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

        if (errors.value && Object.keys(errors.value).length > 0) {
            return
        }

        await store.dispatch('auth/resendEmail', user)

        isLoadingButton.value = false
    } catch (error) {
        console.log('error: ', error)
    }
}
</script>

<style></style>
