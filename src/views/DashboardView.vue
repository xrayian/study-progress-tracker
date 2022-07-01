<script setup lang="ts">
import SubjectProgressCard from '@/components/SubjectProgressCard.vue';
</script>
<template>
    <div class="container mx-auto my-5">
        <el-main>
            <h2 class="text-3xl my-5">Overall Stats</h2>
            <subject-progress-card title="Overall Progress" fluid description="lorem5" :progress="30" />

            <h2 class="text-3xl my-5">Basic Subjects Progress</h2>
            <div
                class="my-12 lg:my-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-6 md:gap-x-4 md:justify-items-center">
                <subject-progress-card title="Bengali 1st Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="Bengali 2nd Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="English 1st Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="English 2nd Paper" description="lorem5" :progress="65" />
            </div>

            <h2 class="text-3xl mb-5 mt-10">Science Subjects Progress</h2>
            <div
                class="my-12 lg:my-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-6 md:gap-x-4 md:justify-items-center">
                <subject-progress-card title="Physics 1st Paper" description="lorem5" :progress="65" planned="8" MCQ="3"
                    chapters="12" />
                <subject-progress-card title="Physics 2nd Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="Chemistry 1st Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="Chemistry 2nd Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="Higher Maths 1st Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="Higher Maths 2nd Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="Biology 1st Paper" description="lorem5" :progress="65" />
                <subject-progress-card title="Biology 2nd Paper" description="lorem5" :progress="65" />
            </div>
        </el-main>


    </div>
</template>