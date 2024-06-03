<template>
    <div>
        <el-card class="m-[20px]">
            <template #header>
                <div class="card-header text-main-color">
                    <span>{{ title }}</span>
                </div>
            </template>
            <el-menu-item
                :index="indexPrefix + genre.id"
                v-for="genre in genres"
                :key="indexPrefix + genre.id"
                :title="genre.name_genre"
            >
                <span class="overflow-hidden text-ellipsis">{{ genre.name_genre }}</span>
            </el-menu-item>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { Genre } from '@/types'
defineProps<{
    title: string
    indexPrefix: string
    genres: Genre[]
}>()
</script>
<style scoped></style>
