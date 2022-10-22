<script setup lang="ts">
import SubjectProgressCard from "@/components/SubjectProgressCard.vue";
import { db } from "@/FirebaseInit";
import router from "@/router";
import {
    doc,
    getDoc,
    getDocs,
    collection,
    type DocumentData,
} from "@firebase/firestore";
import { onMounted, ref } from "vue";
import { VueSpinner } from "vue3-spinners";
import { useStore } from "vuex";
import type { SubjectDashboardData } from "@/interfaces";

//consts
const store = useStore();
const hasLoaded = ref(false);
const overallStats: SubjectDashboardData = {
    id: "overall",
    chapters: 0,
    cqFinished: 0,
    mcqFinished: 0,
    planned: 0,
    revised: 0,
};
const subjectStats: SubjectDashboardData[] = [
    {
        id: "1",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "2",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "3",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "4",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "5",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "6",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "7",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "8",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "9",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "10",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "11",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
    {
        id: "12",
        chapters: 0,
        mcqFinished: 0,
        revised: 0,
        cqFinished: 0,
        planned: 0,
    },
];

//load user progress data
const getProgressData = async () => {
    const docRef = doc(db, "progress", store.state.user.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data != null) {
        updateSubjectDashboardFromProgress(data);
    }
};

const updateSubjectDashboardFromProgress = (data: DocumentData) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
        subjectStats.forEach((subject) => {
            if (key.split("-")[0] == subject.id) {
                data[key].planned ? (subject.planned += 1) : null;
                data[key].cq ? (subject.cqFinished += 1) : null;
                data[key].mcq ? (subject.mcqFinished += 1) : null;
                data[key].revised ? (subject.revised += 1) : null;
            }
        });
    });
};

//load subject data
const getSubjectChapterCount = async () => {
    for (let i = 0; i < subjectStats.length; i++) {
        const docRef = getDocs(
            collection(db, `subjects/${subjectStats[i].id}/chapters`)
        );
        const size = (await docRef).size;
        subjectStats[i].chapters = size;
    }
};

const calculateOverall = () => {
    subjectStats.forEach((subject) => {
        overallStats.planned += subject.planned;
        overallStats.chapters += subject.chapters;
        overallStats.cqFinished += subject.cqFinished;
        overallStats.mcqFinished += subject.mcqFinished;
        overallStats.revised += subject.revised;
    });
};

//calculate computed values
const fetchAllData = async () => {
    await getProgressData();
    await getSubjectChapterCount();
    calculateOverall();
    hasLoaded.value = true;
};

const calculateProgress = (subject: SubjectDashboardData) => {
    let determiningFactor = subject.planned;
    if (determiningFactor == 0) {
        determiningFactor = subject.chapters;
    }
    const percentage =
        (subject.cqFinished / determiningFactor) * 70 +
        (subject.mcqFinished / determiningFactor) * 30;
    const calculatedNumber = Math.ceil(percentage);
    return calculatedNumber > 100 ? 100 : calculatedNumber;
};

// startup
onMounted(async () => {
    if ((await store.state.user) == null) {
        router.push("/");
    } else {
        await fetchAllData();
    }
});
</script>
<template>
    <div class="container mx-auto my-5">
        <el-main v-if="hasLoaded">
            <h2 class="text-3xl my-5">Overall Stats</h2>
            <div class="md:mx-4">
                <subject-progress-card title="Overall Progress" fluid :progress="calculateProgress(overallStats)"
                    :data="overallStats" />
            </div>

            <h2 class="text-3xl my-5">Basic Subjects</h2>
            <div
                class="my-12 lg:my-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-6 md:gap-x-4 md:justify-items-center">
                <subject-progress-card title="Bengali 1st Paper" :progress="calculateProgress(subjectStats[0])"
                    :data="subjectStats[0]" />

                <subject-progress-card title="Bengali 2nd Paper" :progress="calculateProgress(subjectStats[1])"
                    :data="subjectStats[1]" />

                <subject-progress-card title="English 1st Paper" :progress="calculateProgress(subjectStats[2])"
                    :data="subjectStats[2]" />

                <subject-progress-card title="English 2nd Paper" :progress="calculateProgress(subjectStats[3])"
                    :data="subjectStats[3]" />
            </div>

            <h2 class="text-3xl mb-5 mt-10">Science Subjects</h2>
            <div
                class="my-12 lg:my-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-6 md:gap-x-4 md:justify-items-center">
                <subject-progress-card title="Physics 1st Paper" :progress="calculateProgress(subjectStats[4])"
                    :data="subjectStats[4]" />
                <subject-progress-card title="Physics 2nd Paper" :progress="calculateProgress(subjectStats[5])"
                    :data="subjectStats[5]" />
                <subject-progress-card title="Chemistry 1st Paper" :progress="calculateProgress(subjectStats[6])"
                    :data="subjectStats[6]" />
                <subject-progress-card title="Chemistry 2nd Paper" :progress="calculateProgress(subjectStats[7])"
                    :data="subjectStats[7]" />
                <subject-progress-card title="Higher Maths 1st Paper" :progress="calculateProgress(subjectStats[10])"
                    :data="subjectStats[10]" />
                <subject-progress-card title="Higher Maths 2nd Paper" :progress="calculateProgress(subjectStats[11])"
                    :data="subjectStats[11]" />
                <subject-progress-card title="Biology 1st Paper" :progress="calculateProgress(subjectStats[8])"
                    :data="subjectStats[8]" />
                <subject-progress-card title="Biology 2nd Paper" :progress="calculateProgress(subjectStats[9])"
                    :data="subjectStats[9]" />
            </div>
        </el-main>
        <el-main class="my-32" v-else>
            <vue-spinner size="50" class="mx-auto" />
        </el-main>
    </div>
</template>
