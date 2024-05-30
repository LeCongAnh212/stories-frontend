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
                <div class="rounded-full bg-cyan-300 w-20 h-20 flex items-center overflow-hidden">
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
        <div class="w-full">
            <label for="" class="text-left">Email:</label>
            <BaseInput
                v-model="user.email"
                fieldName="email"
                placeholder="email"
                :rules="['required', 'email']"
                type="email"
                class="mt-1 border-blue-300"
            >
            </BaseInput>
        </div>
        <div class="w-full">
            <label for="" class="text-left">Username:</label>
            <BaseInput
                v-model="user.username"
                :rules="['required', 'email']"
                fieldName="username"
                placeholder="username"
                class="mt-1 border-blue-300"
            >
            </BaseInput>
        </div>
        <div class="w-full">
            <label for="" class="text-left">Password:</label>
            <BaseInput
                v-model="user.password"
                fieldName="password"
                placeholder="password"
                :rules="['required', 'email']"
                type="password"
                class="mt-1 border-blue-300"
            >
            </BaseInput>
        </div>
        <div class="w-full">
            <label for="" class="text-left">Fullname:</label>
            <BaseInput
                v-model="user.full_name"
                fieldName="fullname"
                placeholder="fullname"
                :rules="['required', 'email']"
                class="mt-1 border-blue-300"
            >
            </BaseInput>
        </div>
        <!-- <div class="w-full">
            <label for="" class="text-left">Avatar:</label>
            <BaseInput @change="onFileChange" type="file" class="mt-1 border-blue-300"> </BaseInput>
        </div> -->
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="innerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="register()"> Register </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
// import { FormRegister } from '@api/modules/auth/types.ts'
import { FormRegister } from '../../api/modules/auth/types'

const store = useStore()

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

watch(innerDialogVisible, (newValue) => {
    emit('update:dialogVisible', newValue)
})

watch(
    () => props.dialogVisible,
    (newValue) => {
        innerDialogVisible.value = newValue
    },
)

const register = async () => {
    try {
        await store.dispatch('auth/register', user)
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
</script>

<style></style>
