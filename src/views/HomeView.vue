<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto mb-24 mt-6 lg:my-14">
    <el-main>
      <h1 class="text-4xl mb-8">Welcome to Amar Progress!</h1>

      <p class="text-xl">
        This is a progress tracking app for students. Simply select the chapters you want to complete and this will show
        you how much you completed in each subject. Only for HSC 2022 Science Students.
      </p>

      <p class="text-xl mt-4">
        You will need to sign up in order to use this site.
      </p>

      <router-link :to="{ name: 'login' }" class="btn btn-primary mt-8">Get Started</router-link>
    </el-main>

  </div>
</template>
