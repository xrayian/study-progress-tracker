<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue';
import FooterMenu from './components/FooterMenu.vue';
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
      <footer-menu />
    </el-footer>
  </el-container>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400&display=swap');

:root {
  font-family: 'Poppins', sans-serif;
}
</style>
