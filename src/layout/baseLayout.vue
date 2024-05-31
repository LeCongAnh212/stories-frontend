<template>
    <div class="common-layout bg-blue-50 h-screen">
        <el-container>
            <el-header class="bg-pink-100">
                <DefaultHeader />
            </el-header>
            <el-container class="">
                <el-aside width="400px" class="bg-gray-100">
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
