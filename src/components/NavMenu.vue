<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => {
    return store.state.user;
});

const authReady = computed(() => {
    return store.state.isAuthReady;
});


const handleSignOut = async () => { await store.dispatch('logout'); router.push('/') }

</script>
<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden swap swap-rotate">
                    <svg xmlns="http://www.w3.org/2000/svg" class="swap-off h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    <svg class="swap-on fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 512 512">
                        <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li v-if="user != null">
                        <router-link class="rounded-md" :to="{ name: 'dashboard' }">
                            Dashboard</router-link>
                    </li>
                    <li v-if="user != null">
                        <router-link class="rounded-md" :to="{ name: 'progress-control' }">
                            Progress</router-link>
                    </li>
                    <li>
                        <router-link class="rounded-md" :to="{ name: 'about' }">
                            About
                        </router-link>
                    </li>
                </ul>
            </div>
            <router-link :to="{ name: 'home' }" class="btn btn-ghost normal-case text-xl">Amar Progress</router-link>
        </div>
        <div v-if="authReady" class="navbar-end">
            <div class="hidden lg:flex pr-3">
                <ul class="menu menu-horizontal p-0">
                    <li v-if="user != null">
                        <router-link class="rounded-md" :to="{ name: 'dashboard' }">
                            Dashboard</router-link>
                    </li>
                    <li v-if="user != null">
                        <router-link class="rounded-md mx-[2px]" :to="{ name: 'progress-control' }">
                            Progress</router-link>
                    </li>
                    <li>
                        <router-link class="rounded-md mx-[2px]" :to="{ name: 'about' }">
                            About
                        </router-link>
                    </li>
                </ul>
            </div>
            <div v-if="user" class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div v-if="user.photoURL" class="w-10 rounded-full">
                        <img v-bind:src="user.photoURL ?? '#'" />
                    </div>
                    <el-icon :size="30" v-else>
                        <Avatar />
                    </el-icon>
                </label>
                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li class="menu-title">
                        <span>{{ user.displayName }}</span>
                    </li>
                    <li><a @click="handleSignOut">Logout</a></li>
                </ul>
            </div>
            <div v-else>
                <router-link class="btn rounded-md" :to="{ name: 'login' }">
                    Login
                </router-link>
            </div>
        </div>
    </div>
</template>