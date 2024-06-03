<template>
    <div>
        <base-button
            v-if="!isLoggedIn"
            @click="toggleLogin"
            class="btn-outline btn-small hidden lg:flex"
            >Đăng nhập</base-button
        >
        <login-view :show="showLogin" @close="toggleLogin" />
        <base-button v-if="isLoggedIn" @click="handleLogout">Đăng xuất</base-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginView from '@/views/auth/login/index.vue'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'
import store from '@/store'
import i18n from '@/i18n'

const showLogin = ref(false)

const toggleLogin = () => {
    showLogin.value = !showLogin.value
}

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])

const router = useRouter()

const handleLogout = async () => {
    try {
        await store.dispatch('auth/logout')
        router.push({ name: 'home' })
        showToast(i18n.global.t('common.logout_success'), ToastType.SUCCESS)
    } catch (error) {
        showToast(i18n.global.t('common.logout_error'), ToastType.ERROR)
    }
}
</script>
