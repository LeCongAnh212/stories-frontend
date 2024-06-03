<template>
    <div class="common-layout bg-blue-50 h-screen">
        <el-container>
            <el-header class="bg-pink-100 !px-0">
                <DefaultHeader />
            </el-header>
            <el-container class="min-h-[93vh]">
                <el-aside class="bg-gray-100 lg:!w-[400px] md:!w-[300px] hidden md:block">
                    <DefaultList />
                </el-aside>
                <el-main class="bg-cyan-200">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts"></script>

<style></style>
