<template>
    <div v-if="isShow" class="flex flex-col justify-center items-center h-[100vh]">
        <span class="text-base font-medium mt-4 mb-9">You don't have authorized</span>
        <router-link to="{ name: 'login' }" @click="redirectHome">
            <base-button
                class="py-2 text-body-xs h-10 bg-sky-600 text-white rounded-lg flex justify-center items-center"
            >
                <span class="ml-2 text-sm font-medium">Back home</span>
            </base-button>
        </router-link>
    </div>
</template>
<script setup lang="ts">
const isShow = ref(true)
const router = useRouter()
const redirectHome = async () => {
    const resolvedRoute = router.resolve({ name: 'home' })
    const url = new URL(resolvedRoute.href, window.location.origin)
    window.location.href = url.toString()
}
</script>
