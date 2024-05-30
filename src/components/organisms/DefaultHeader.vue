<template>
    <div class="flex gap-3 mx-10 justify-between items-center">
        <div class="w-10 h-10 bg-blue-300">
            <img src="" alt="" />
        </div>
        <ul class="list-none flex gap-10 text-left flex-1 px-14">
            <li v-for="item in categories">{{ item }}</li>
        </ul>
        <div>
            <el-button type="success" plain @click="dialogVisible = true">Register</el-button>
            <!-- <BaseButton status="warning">ádasdasd</BaseButton> -->
        </div>
    </div>

    <RegisterModal :dialogVisible="dialogVisible" @update:dialogVisible="handleModalRegister" />
</template>

<script setup lang="ts">
defineEmits(['update:dialogVisible'])

const categories = reactive(['Novel', 'Comit', 'Postcard'])

const dialogVisible = ref(false)

const handleModalRegister = (value) => {
    dialogVisible.value = value
}
</script>
