<template>
    <el-dialog
        v-model="innerDialogVisible"
        title="Register an Account"
        width="700"
        class="!px-20 flex flex-col items-center justify-center [&>div]:w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-5 [&>div]:justify-center [&>div]:items-center"
    >
        <span>Register to follow and like books</span>

        <div>
            <div class="relative">
                <div class="rounded-full bg-main-primary-300 w-20 h-20 flex items-center overflow-hidden">
                    <img
                        :src="URLImage ?? '../../assets/img/default_avatar.png'"
                        class="object-cover w-full h-full"
                        alt=""
                    />
                </div>
                <label htmlFor="abc" class="absolute cursor-pointer bottom-1 right-1 w-5 h-5 text-gray-300">
                    <BaseIcon name="photo" />
                    <BaseInput
                        id="abc"
                        @change="onFileChange"
                        fieldName="avatar"
                        :rules="['required', 'email']"
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

        <template #footer>
            <div class="dialog-footer">
                <el-button
                    :disabled="isLoadingButton"
                    :class="isLoadingButton ? 'cursor-not-allowed' : ''"
                    @click="handleCloseModal()"
                >
                    Cancel
                </el-button>
                <el-button
                    :disabled="isLoadingButton"
                    :class="isLoadingButton ? 'cursor-not-allowed' : ''"
                    type="info"
                    @click="resendEmail()"
                >
                    Resend email
                </el-button>
                <el-button
                    :disabled="isLoadingButton"
                    :class="isLoadingButton ? 'cursor-not-allowed' : ''"
                    type="primary"
                    @click="register()"
                >
                    Register
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
// import { FormRegister } from '@api/modules/auth/types.ts'
import { FormRegister } from '../../api/modules/auth/types'
import { MAX_WIDTH_SM } from '@/constants'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const store = useStore()
const router = useRouter()

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['update:dialogVisible'])

const innerDialogVisible = ref(props.dialogVisible)
const user: FormRegister = reactive({
    email: '',
    username: '',
    password: '',
    full_name: '',
})
const URLImage = ref('src/assets/img/default_avatar.png')
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

watch(innerDialogVisible, (newValue) => {
    emit('update:dialogVisible', newValue)
})

watch(
    () => props.dialogVisible,
    (newValue) => {
        innerDialogVisible.value = newValue
    },
)

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
    if (innerDialogVisible.value && window.innerWidth < MAX_WIDTH_SM) {
        router.push({ name: 'register' })
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
function onFileChange(event) {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
        URLImage.value = URL.createObjectURL(file)
        user.avatar = file
    }
}
function handleCloseModal() {
    innerDialogVisible.value = false
    isSubmit.value = false
}
</script>

<style></style>
