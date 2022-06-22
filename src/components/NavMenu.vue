<script setup lang="ts">
// const handleSelect = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
</script>

<template>
    <el-menu mode="horizontal" :ellipsis="false" router>
        <p class="my-4 ml-2">Amar Progress</p>
        <div class="flex-grow"></div>
        <el-menu-item index="0" :route="{ name: 'home' }"> Home </el-menu-item>
        <el-menu-item index="1" :route="{ name: 'progress-control' }"> Progress </el-menu-item>
        <el-menu-item index="2" :route="{ name: 'login' }"> Login </el-menu-item>
        <el-menu-item index="3" :route="{ name: 'about' }"> About </el-menu-item>
    </el-menu>
</template>