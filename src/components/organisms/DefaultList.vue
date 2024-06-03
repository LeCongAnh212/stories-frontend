<template>
    <el-menu class="!bg-inherit" active-text-color="#1ed291">
        <MenuGenre title="Truyện tranh" index-prefix="comic-" :genres="comicGenres"></MenuGenre>
        <MenuGenre title="Truyện chữ" index-prefix="novel-" :genres="novelGenres"></MenuGenre>
        <MenuStory
            title="Truyện được xem nhiều nhất"
            index-prefix="popular-"
            :stories="popularStories"
        ></MenuStory>
        <MenuStory
            title="Truyện mới phát hành"
            index-prefix="new-"
            :stories="newStories"
        ></MenuStory>
    </el-menu>
</template>

<script setup lang="ts">
import { Genre } from '@/types'

const genres = ref<Genre[]>([
    { id: 1, name_genre: 'Khoa học' },
    { id: 2, name_genre: 'Lịch sử' },
    { id: 3, name_genre: 'Cổ đại' },
])

const stories = ref([
    { id: 1, title: 'Truyện Khoa học 1', id_genre: 1, type: 'comic' },
    { id: 2, title: 'Truyện Lịch sử 1', id_genre: 2, type: 'comic' },
    { id: 3, title: 'Truyện Cổ đại 1', id_genre: 3, type: 'novel' },
])

const comicGenres = computed(() =>
    genres.value.filter((genre) =>
        stories.value.some((book) => book.id_genre === genre.id && book.type === 'comic')
    )
)

const novelGenres = computed(() =>
    genres.value.filter((genre) =>
        stories.value.some((book) => book.id_genre === genre.id && book.type === 'novel')
    )
)

const popularStories = ref([
    { id: 1, title: 'Truyện Khoa học 1', views: 123 },
    {
        id: 2,
        title: 'Truyện Cổ đại 1',
        views: 186,
    },
])

const newStories = ref([
    { id: 1, title: 'Truyện Cổ đại 1' },
    { id: 2, title: 'Truyện Lịch sử 1' },
])
</script>
