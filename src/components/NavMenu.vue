<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const currentRoute = computed(() => {
    return useRoute().name
})
</script>
<template>
    <div class="drawer">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <div class="w-full navbar bg-base-300">
                <div class="flex-none lg:hidden">
                    <label for="my-drawer-3" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-6 h-6 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div class="flex-1 px-2 mx-2">
                    <router-link class="btn btn-ghost normal-case text-xl" :to="{ name: 'home' }">Amar Progress
                    </router-link>
                </div>
                <div class="flex-none hidden lg:block">
                    <ul class="menu menu-horizontal">
                        <!-- Navbar menu content here -->
                        <li>
                            <router-link class="rounded-md" :class="currentRoute == 'login' ? 'active' : null"
                                :to="{ name: 'login' }">
                                Login
                            </router-link>
                        </li>
                        <li>
                            <router-link class="rounded-md"
                                :class="currentRoute == 'progress-control' ? 'active' : null"
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
            </div>
            <div class="grow">
                <slot name='content'></slot>
            </div>

            <slot name='footer'></slot>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-3" class="drawer-overlay"></label>
            <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
                <!-- Sidebar content here -->
                <p class="my-4 mx-1">
                    <router-link :to="{ name: 'home' }"> Amar Progress</router-link>
                </p>
                <li>
                    <router-link :class="currentRoute == 'login' ? 'active' : null" :to="{ name: 'login' }">Login
                    </router-link>
                </li>
                <li>
                    <router-link :class="currentRoute == 'progress-control' ? 'active' : null"
                        :to="{ name: 'progress-control' }">
                        Progress</router-link>
                </li>
                <li>
                    <router-link :class="currentRoute == 'about' ? 'active' : null" :to="{ name: 'about' }">About
                    </router-link>
                </li>
            </ul>

        </div>
    </div>


</template>