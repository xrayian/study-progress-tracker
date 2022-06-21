<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = ref({
    chapter_number: 1,
    chapter_name: 'Chapter Name',
    progress: true,
})
const activeSubject = ref('Bangla 1st Paper')
const tableData = ref(Array.from({ length: 12 }).fill(item.value))
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const handleSelect = (key: string, keyPath: string[]) => {
    console.log(keyPath)
    item.value.chapter_name = keyPath[1]
    activeSubject.value = keyPath[1]
}
</script>


<template>
    <div class="flex flex-row gap-2">
        <div class="w-100">
            <el-menu :default-openeds="['1', '2']" default-active="bangla-1" @open="handleOpen" @close="handleClose"
                @select="handleSelect">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <Management />
                        </el-icon>Basic
                    </template>
                    <el-menu-item index="bangla-1">Bengali 1st Paper</el-menu-item>
                    <el-menu-item index="bangla-2">Bengali 2nd Paper</el-menu-item>
                    <el-menu-item index="english-1">English 1st Paper</el-menu-item>
                    <el-menu-item index="english-2">English 2nd Paper</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Magnet />
                        </el-icon>
                        Science
                    </template>
                    <el-menu-item index="physics-1">Physics 1st Paper</el-menu-item>
                    <el-menu-item index="physics-2">Physics 2nd Paper</el-menu-item>
                    <el-menu-item index="chemistry-1">Chemistry 1st Paper</el-menu-item>
                    <el-menu-item index="chemistry-2">Chemistry 2nd Paper</el-menu-item>
                    <el-menu-item index="higher-maths-1">Higher-Maths 1st Paper</el-menu-item>
                    <el-menu-item index="higher-maths-2">Higher-Maths 2nd Paper</el-menu-item>
                    <el-menu-item-group title="Fourth Subjects">
                        <el-menu-item index="biology-1">Biology 1st Paper</el-menu-item>
                        <el-menu-item index="biology-2">Biology 2nd Paper</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="grow">
            <el-header>
                <h3 class="text-right text-xl">{{ activeSubject }}</h3>
            </el-header>
            <el-scrollbar>
                <el-table :data="tableData">
                    <el-table-column prop="chapter_number" label="Chapter #" width="100px" />
                    <el-table-column prop="chapter_name" label="Name" width="400px" />
                    <el-table-column prop="progress" label="Progress" />
                </el-table>
            </el-scrollbar>
        </div>
    </div>
</template>


<style scoped>
* {
    border-radius: 10px !important;
}

/* .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
} */

.el-aside {
    color: var(--el-text-color-primary);
    /* background: var(--el-color-primary-light-8); */
}

.el-menu {
    border-right: none;
}


.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>