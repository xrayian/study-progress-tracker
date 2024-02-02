<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import LoginView from './auth/LoginView.vue';
const store = useStore();
const authReady = computed(() => {
  return store.state.isAuthReady;
});

</script>

<template>
  <div class="container mx-auto mb-24 mt-6 lg:my-14">
    <el-main>
      <div class="flex flex-col md:grid md:grid-cols-5 gap-2 grid-flow-col items-center">
        <div class="md:col-span-2 col-span-1">
          <h1 class="text-4xl mb-8">Welcome to Amar Progress!</h1>

          <p class="text-xl">
            This is a progress tracking app for students. Simply select the chapters you want to complete and this will
            show
            you how much you completed in each subject. Made for HSC 2022-23 Science Students.
          </p>


          <template v-if=authReady>
            <p class="text-xl mt-4" v-if="store.state.user == null">
              You will need to sign up in order to use this site.
            </p>
            <router-link v-if="store.state.user != null" :to="{ name: 'dashboard' }" class="btn btn-primary mt-8 btn-block md:btn-wide">
              Visit Dashboard
            </router-link>
            <router-link v-else :to="{ name: 'login' }" class="btn btn-primary mt-8 btn-block md:btn-wide">
              Get Started
            </router-link>
          </template>
        </div>
        <div class="md:col-span-3 col-span-1 mt-3 md:mt-1">
          <template v-if="authReady && store.state.user == null">
            <login-view />
          </template>
          <template v-else>
            <div class="flex justify-center items-center">
              <img src="/home.svg" class="md:w-[28vw] w-96" alt="">
            </div>
          </template>

        </div>
      </div>


    </el-main>

  </div>
</template>
