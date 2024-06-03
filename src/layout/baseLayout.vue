<template>
    <div class="common-layout h-screen">
        <el-container>
            <el-header class="!px-0">
                <DefaultHeader />
            </el-header>
            <el-container class="min-h-[93vh]">
                <el-aside class="lg:!w-[400px] md:!w-[300px] hidden md:block">
                    <DefaultList />
                </el-aside>
                <el-main class="">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts"></script>

<style></style>
