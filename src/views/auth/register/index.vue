<template>
    <div class="p-4 bg-gray-300 h-full relative flex flex-col items-center gap-3 text-gray-600">
        <div class="w-5 h-5 absolute top-4 left-4 cursor-pointer" @click="$router.back()">
            <BaseIcon
                name="arrowLeft"
                class="stroke-white fill-white"
                stroke="white"
                fill="white"
                :isActiveHover="true"
            />
        </div>

        <strong class="text-white mb-20">Register Account</strong>

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
</template>

<script setup lang="ts">
// import { FormRegister } from '../../api/modules/auth/types'
import { MAX_WIDTH_SM } from '@/constants'
import { FormRegister } from '@/api/modules/auth/types'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const store = useStore()
const router = useRouter()

const user: FormRegister = reactive({
    email: '',
    username: '',
    password: '',
    full_name: '',
})
const URLImage = ref('../src/assets/img/default_avatar.png')
const isSubmit = ref(false)
const isLoadingButton = ref(false)

const { errors } = useForm({
    validationSchema: yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
        fullname: yup.string().required('Fullname is required'),
    }),
})

onMounted(() => {
    window.addEventListener('resize', handleResize)
    watchEffect(() => {
        handleResize()
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
    if (window.innerWidth >= MAX_WIDTH_SM) {
        console.log('widthScreen.value: ', window.innerWidth)
        router.push({ name: 'home' })
    }
}
const register = async () => {
    try {
        isLoadingButton.value = true
        isSubmit.value = true

        if (errors.value && Object.keys(errors.value).length > 0) {
            return
        }

        await store.dispatch('auth/register', user)

        isLoadingButton.value = false
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
