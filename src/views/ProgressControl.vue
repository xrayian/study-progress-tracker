<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import type { Subject, Chapter } from '@/interfaces';
import { useStore } from 'vuex';
import router from '@/router';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/FirebaseInit'



const store = useStore();

onMounted(() => {
    if (store.state.user == null) {
        router.push('/')
    }
})


const activeSubject: Ref<string> = ref("")
const tableData: Ref<Chapter[]> = ref([]);
const subjectList: Subject[] = [
    {
        id: 1,
        group: 'regular',
        name: 'bangla 1',
        slug: 'bangla-1'
    }
]

const chapterData: Chapter[] = [
    {
        id: 1,
        number: 1,
        name: "My Chapter",
        subject_id: 1,
        cq: false,
        mcq: true
    },
    {
        id: 2,
        number: 2,
        name: "My Chapter #2",
        subject_id: 3,
        // progress: 25,
        mcq: false,
        cq: true
    },
    {
        id: 3,
        number: 3,
        name: "My Chapter #3",
        subject_id: 1,
        // progress: 85,
        cq: true,
        mcq: true
    },
]


function updateTableData(subject_id: number) {
    const subjectChapters: Chapter[] = [];
    chapterData.forEach((chapter) => {
        if (chapter.subject_id == subject_id) {
            subjectChapters.push(chapter);
            // console.log(chapter)
        }
    });
    tableData.value = subjectChapters
}


const handleSelect = (key: string, keyPath: string[]) => {
    // console.log(keyPath)
    subjectList.forEach((subject) => {
        if (subject.slug == keyPath[1]) {
            activeSubject.value = subject.name
            updateTableData(subject.id)
        }
    })
}

const toggleMcq = (index: number, chapter: Chapter) => {
    // console.log(index, chapter)
    chapter.mcq = !chapter.mcq
}

const toggleCq = (index: number, chapter: Chapter) => {
    // console.log(index, chapter)
    chapter.cq = !chapter.cq
}

onMounted(() => {
    handleSelect('0', ['0', 'bangla-1'])
})
</script>


<template>
    <div class="m-3">
        <el-row :gutter="20">
            <el-col :span="24" :md="7" :lg="6" :xl="4">
                <el-menu class="rounded-xl py-2" :default-openeds="['1', '2']" default-active="bangla-1"
                    @select="handleSelect">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <Management />
                            </el-icon>Basic
                        </template>
                        <template v-for="subject in subjectList" :key="subject.id">
                            <template v-if="subject.group == 'regular'">
                                <el-menu-item :index="subject.slug">{{ subject.name }}</el-menu-item>
                            </template>
                        </template>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <Magnet />
                            </el-icon>
                            Science
                        </template>
                        <template v-for="subject in subjectList" :key="subject.id">
                            <template v-if="subject.group == 'science'">
                                <el-menu-item :index="subject.slug">{{ subject.name }}</el-menu-item>
                            </template>
                        </template>
                    </el-sub-menu>
                </el-menu>
            </el-col>
            <el-col :span="24" :md="17" :lg="18" :xl="20" class="pt-1 md:pt-0">
                <h3 class="pt-4 pb-3 md:py-5 text-3xl">{{ activeSubject }}</h3>
                <div class="overflow-x-auto">
                    <el-table table-layout="auto" class="rounded-xl" :data="tableData">
                        <el-table-column prop="number" label="" />
                        <el-table-column prop="name" label="Name" />
                        <!-- <el-table-column prop="progress" label="Completion">
                            <template #default="scope">
                                <el-progress :text-inside="true" :stroke-width="16" :percentage="scope.row.progress" />
                            </template>
                        </el-table-column> -->
                        <el-table-column label="Progress">
                            <el-table-column prop="mcq" label="MCQ">
                                <template #default="scope">
                                    <el-button size="small" :type="scope.row.mcq ? 'success' : 'default'"
                                        @click="toggleMcq(scope.$index, scope.row)">
                                        <el-icon :size="18">
                                            <Check />
                                        </el-icon>
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cq" label="CQ">
                                <template #default="scope">
                                    <el-button size="small" :type="scope.row.cq ? 'success' : 'default'"
                                        @click="toggleCq(scope.$index, scope.row)">
                                        <el-icon :size="18">
                                            <Check />
                                        </el-icon>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>

</template>