<template>
    <div class="h-full flex items-center px-5 justify-between relative">
        <router-link :to="{ name: 'home' }">
            <div class="flex items-center gap-4 cursor-pointer none text-black">
                <div class="overflow-hidden rounded-full w-10 h-10 flex items-center">
                    <img class="object-cover w-full h-full" :src="logo" alt="logo" />
                </div>
                <span class="text-3xl font-bold">Story</span>
            </div>
        </router-link>

        <div class="flex-1 flex-row-reverse me-4 md:flex hidden">
            <div class="relative">
                <el-input
                    v-model="search"
                    size="large"
                    placeholder="Please input"
                    class="[&>div>input]:pe-10 input-search"
                />
                <div class="w-4 me-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-0">
                    <BaseIcon name="search" />
                </div>
            </div>
        </div>

        <div class="gap-2 items-center md:flex hidden">
            <el-button type="warning" round plain>Service Package</el-button>
            <el-button v-if="!isLogin" type="primary" round>Login</el-button>
            <el-button v-if="!isLogin" type="success" round>Register</el-button>
            <el-dropdown v-if="isLogin" ref="dropdown" trigger="contextmenu">
                <span class="el-dropdown-link">
                    <div
                        class="w-10 h-10 flex items-center overflow-hidden rounded-full cursor-pointer"
                        @click="showClick()"
                    >
                        <img :src="avatarDefault" alt="avatar" />
                    </div>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Profile</el-dropdown-item>
                        <el-dropdown-item>Register as an author</el-dropdown-item>
                        <el-dropdown-item>Manager Service Package</el-dropdown-item>
                        <el-dropdown-item>Setting</el-dropdown-item>
                        <el-dropdown-item>Logout</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="w-6 md:hidden block cursor-pointer" @click="handleOpenNavbar()">
            <BaseIcon name="bars" />
        </div>
        <div
            ref="navbar"
            :class="{ 'w-1/2 md:w-0 ': isOpen, 'w-0 ': !isOpen }"
            class="h-screen top-0 bg-white text-black pt-5 shadow-lg absolute right-0 transition-all duration-200 ease-in-out overflow-hidden"
        >
            <div v-show="isOpen">
                <div class="w-full px-4 flex items-center flex-row-reverse gap-5 text-nowrap">
                    <div
                        class="w-10 h-10 flex items-center overflow-hidden rounded-full cursor-pointer"
                    >
                        <img :src="avatarDefault" alt="avatar" />
                    </div>
                    <b class="text-2xl">Lê Công Anh</b>
                </div>

                <div class="relative px-5 mt-3">
                    <el-input
                        v-model="search"
                        size="large"
                        placeholder="Please input"
                        class="[&>div>input]:pe-6 input-search"
                    />
                    <div class="w-4 me-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4">
                        <BaseIcon name="search" />
                    </div>
                </div>

                <hr class="my-4" />

                <main class="w-full px-5 bg-fuchsia-400">content</main>

                <footer class="bottom-0 w-full px-5 py-3 absolute bg-cyan-100 flex">
                    <el-button type="primary" plain class="w-full">Login</el-button>
                    <el-button type="info" plain class="w-full">Register</el-button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DropdownInstance } from 'element-plus'
import avatarDefault from '@/assets/img/avatar_default.png'
import logo from '@/assets/img/logo.jpg'

const search = ref('')
const isLogin = ref(true)
const navbar = ref<HTMLElement | null>(null)
const isOpen = ref(true)
const dropdown = ref<DropdownInstance>()

function showClick() {
    if (!dropdown.value) return

    dropdown.value.handleOpen()
}
function handleOpenNavbar() {
    if (navbar.value) {
        setTimeout(() => {
            isOpen.value = true
        }, 1)
    }
}
const handleClick = (event) => {
    if (navbar.value && !navbar.value.contains(event.target)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClick)
})
</script>
