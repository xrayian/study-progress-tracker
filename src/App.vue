<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue';
import FooterMenu from './components/FooterMenu.vue';
</script>

<template>
  <div class="h-screen flex flex-col">
    <nav-menu />
    <div class="grow">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <footer-menu />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400&display=swap');

:root {
  font-family: 'Poppins', sans-serif;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: var(--el-color-primary-light-9);
}

*::-webkit-scrollbar-thumb {
  background: var(--el-color-primary-light-3);

  border-radius: 100vh;
  /* border: 3px solid #f6f7ed; */
}

*::-webkit-scrollbar-thumb:hover {
  background: var(--el-color-primary);
}

html {
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-image: url('bg.svg');
}
</style>
