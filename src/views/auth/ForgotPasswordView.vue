<script lang="ts" setup>
import { auth } from '@/FirebaseInit';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';


const email = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const handleSubmit = () => {
    sendPasswordResetEmail(auth, email.value)
        .then(() => {
            successMessage.value = "Reset Email Sent Successfully!"
        })
        .catch((error) => {
            errorMessage.value = error.message;
        });
}


const dismissWarning = () => {
    errorMessage.value = ''
    successMessage.value = ''
}


</script>

<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-20 w-auto" src="@/assets/icon.png" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Or
                    <router-link :to="{ name: 'login' }" class="font-medium text-indigo-600 hover:text-indigo-500">
                        sign
                        in to your account
                    </router-link>
                </p>
            </div>
            <div v-if="errorMessage" class="alert alert-warning shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{{ errorMessage }}</span>
                </div>
                <div class="flex-none">
                    <button class="btn btn-sm btn-ghost" @click="dismissWarning">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </button>
                </div>
            </div>
            <div v-if="successMessage" class="alert alert-success shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ successMessage }}</span>
                </div>
                <div class="flex-none">
                    <button class="btn btn-sm btn-ghost" @click="dismissWarning">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </button>
                </div>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" v-model="email" name="email" type="email" autocomplete="email"
                            required="true"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address" />
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Send Reset Link
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

