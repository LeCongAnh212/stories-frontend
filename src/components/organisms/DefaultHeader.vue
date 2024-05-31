<template>
    <div class="flex gap-3 mx-10 justify-between items-center">
        <div class="w-10 h-10 bg-blue-300">
            <img src="" alt="" />
        </div>
        <ul class="list-none flex gap-10 text-left flex-1 px-14">
            <li v-for="item in categories">{{ item }}</li>
        </ul>
        <div>
            <router-link :to="{ name: 'register' }">
                <el-button type="success" plain>Register</el-button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['update:dialogVisible'])

const categories = reactive(['Novel', 'Comit', 'Postcard'])
</script>
