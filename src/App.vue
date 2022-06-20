<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue';
</script>

<template>
  <el-container>
    <el-header>
      <nav-menu />
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer>
      Study Management Helper by <el-link target="_blank" href="https://www.rayianmahi.com">Rayian Mahi</el-link>
    </el-footer>
  </el-container>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400&display=swap');

:root {
  font-family: 'Poppins', sans-serif;
}
</style>
