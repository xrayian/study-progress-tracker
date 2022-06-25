<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

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

const handleSignOut = async () => { await store.dispatch('logout'); }

</script>
<template>

    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <router-link class="rounded-md" :class="currentRoute == 'about' ? 'active' : null"
                            :to="{ name: 'about' }">
                            About
                        </router-link>
                    </li>
                    <li v-if="user != null">
                        <router-link class="rounded-md" :class="currentRoute == 'progress-control' ? 'active' : null"
                            :to="{ name: 'progress-control' }">
                            Progress</router-link>
                    </li>
                </ul>
            </div>
            <router-link :to="{ name: 'home' }" class="btn btn-ghost normal-case text-xl">Amar Progress</router-link>
        </div>
        <div v-if="authReady" class="navbar-end">
            <div class="hidden lg:flex">
                <ul class="menu menu-horizontal p-0">
                    <li>
                        <router-link class="rounded-md mx-[2px]" :class="currentRoute == 'about' ? 'active' : null"
                            :to="{ name: 'about' }">
                            About
                        </router-link>
                    </li>
                    <li v-if="user != null">
                        <router-link class="rounded-md mx-[2px]"
                            :class="currentRoute == 'progress-control' ? 'active' : null"
                            :to="{ name: 'progress-control' }">
                            Progress</router-link>
                    </li>
                </ul>
            </div>
            <div v-if="user" class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img :src="user.photoURL" />
                    </div>
                </label>
                <ul tabindex="0"
                    class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <p class="justify-between">
                            {{ user.displayName }}
                        </p>
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