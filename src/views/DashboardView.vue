<script setup lang="ts">
import SubjectProgressCard from '@/components/SubjectProgressCard.vue';
import { db } from '@/FirebaseInit';
import router from '@/router';
import { doc, getDoc, getDocs, collection } from '@firebase/firestore';
import { onMounted, ref } from 'vue';
import { VueSpinner } from 'vue3-spinners';
import { useStore } from 'vuex';
import type { SubjectDashboardData } from '@/interfaces'

//consts
const store = useStore();
const hasLoaded = ref(true);
const ban1Stats: SubjectDashboardData = {
    id: '1',
    chapters: '0',
    mcqFinished: '0',
    cqFinished: '0', planned: '0'
}
const ban2Stats: SubjectDashboardData = {
    id: '2',
    chapters: '0',
    mcqFinished: '0',
    cqFinished: '0', planned: '0'
}
const eng1Stats: SubjectDashboardData = {
    id: '3',
    chapters: '0',
    mcqFinished: '0',
    cqFinished: '0', planned: '0'
}
const eng2Stats: SubjectDashboardData = {
    id: '4',
    chapters: '0',
    mcqFinished: '0',
    cqFinished: '0', planned: '0'
}

//load user progress data
const getProgressData = (async () => {
    const docRef = doc(db, "progress", store.state.user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
});

//load subject data
const getSubjectChapterCount = (async (subjects: SubjectDashboardData[]) => {
    subjects.forEach(async (subject) => {
        const docRef = getDocs(collection(db, `subjects/${subject.id}/chapters`));
        subject.chapters = (await docRef).size.toString();
    });

    console.log(subjects)
})

//calculate computed values
const fetchAllData = (async () => {
    await getProgressData();
    await getSubjectChapterCount([ban1Stats, ban2Stats, eng1Stats, eng2Stats]);
})

// startup
onMounted(async () => {
    if (store.state.user == null) {
        router.push('/')
    }
    await fetchAllData();
})


</script>
<template>
    <div class="container mx-auto my-5">
        <el-main v-if="hasLoaded">
            <h2 class="text-3xl my-5">Overall Stats</h2>
            <div class="mx-4">
                <subject-progress-card title="Overall Progress" fluid description="lorem5" :progress="30" />
            </div>

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
        <el-main class="my-32" v-else>
            <vue-spinner size='50' class="mx-auto" />
        </el-main>
    </div>
</template>