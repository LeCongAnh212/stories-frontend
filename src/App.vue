<template>
    <router-view :key="$route.fullPath"></router-view>
</template>

<script setup lang="ts">

const store = useStore()

const accessToken = localStorage.getItem('access_token')
const userProfile = localStorage.getItem('user')

if (accessToken) {
    store.dispatch('auth/setAccessToken', accessToken)
}

if (userProfile) {
    const user = JSON.parse(userProfile)
    store.dispatch('auth/setUserProfile', user)
}
</script>
