<script setup lang="ts">
import router from '@/router';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { themeChange } from 'theme-change';

const store = useStore();

const user = computed(() => {
    return store.state.user;
});
const authReady = computed(() => {
    return store.state.isAuthReady;
});
const currentRoute = computed(() => {
    return useRoute().name
})

onMounted(() => {
    themeChange(false)
})

const handleSignOut = async () => { await store.dispatch('logout'); router.push('/') }

</script>
<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden swap swap-rotate">
                    <svg xmlns="http://www.w3.org/2000/svg" class="swap-off h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    <svg class="swap-on fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 512 512">
                        <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
                <ul tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li v-if="user != null">
                        <router-link class="rounded-md" :class="currentRoute == 'dashboard' ? 'active' : null"
                            :to="{ name: 'dashboard' }">
                            Dashboard</router-link>
                    </li>
                    <li v-if="user != null">
                        <router-link class="rounded-md" :class="currentRoute == 'progress-control' ? 'active' : null"
                            :to="{ name: 'progress-control' }">
                            Progress</router-link>
                    </li>
                    <li>
                        <router-link class="rounded-md" :class="currentRoute == 'about' ? 'active' : null"
                            :to="{ name: 'about' }">
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
                        <router-link class="rounded-md" :class="currentRoute == 'dashboard' ? 'active' : null"
                            :to="{ name: 'dashboard' }">
                            Dashboard</router-link>
                    </li>
                    <li v-if="user != null">
                        <router-link class="rounded-md mx-[2px]"
                            :class="currentRoute == 'progress-control' ? 'active' : null"
                            :to="{ name: 'progress-control' }">
                            Progress</router-link>
                    </li>
                    <li>
                        <router-link class="rounded-md mx-[2px]" :class="currentRoute == 'about' ? 'active' : null"
                            :to="{ name: 'about' }">
                            About
                        </router-link>
                    </li>
                    <li tabindex="0">
                        <a>
                            🎨 Theme
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24">
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                        </a>
                        <ul class="p-2 bg-base-100" data-choose-theme>
                            <li>
                                <a data-set-theme="dracula" data-act-class="outline">Dracula</a>
                            </li>
                            <li>
                                <a data-set-theme="emerald" data-act-class="outline">Emerald</a>
                            </li>
                            <li>
                                <a data-set-theme="garden" data-act-class="outline">Garden</a>
                            </li>
                            <li>
                                <a data-set-theme="light" data-act-class="outline">Light</a>
                            </li>
                            <li>
                                <a data-set-theme="dark" data-act-class="outline">Dark</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div v-if="user" class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div v-if="user.photoURL" class="w-10 rounded-full">
                        <img :src="user.photoURL" />
                    </div>
                    <el-icon :size="30" v-else>
                        <Avatar />
                    </el-icon>
                </label>
                <ul tabindex="0"
                    class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li class="menu-title">
                        <span>{{ user.displayName }}</span>
                    </li>
                    <li><a @click="handleSignOut">Logout</a></li>
                </ul>
            </div>
            <div v-else>
                <router-link class="btn rounded-md" :class="currentRoute == 'login' ? 'btn-primary' : null"
                    :to="{ name: 'login' }">
                    Login
                </router-link>
            </div>
        </div>
    </div>
</template>