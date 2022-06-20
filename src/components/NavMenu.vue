<script setup lang="ts">
// const handleSelect = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
</script>

<template>
    <el-menu mode="horizontal" default-active="0" :ellipsis="false" @select="null" router>
        <el-menu-item>Amar Progress</el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="0" :route="{ name: 'home' }"> Home </el-menu-item>
        <el-menu-item index="1" :route="{ name: 'about' }"> About </el-menu-item>
    </el-menu>
</template>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>
