<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import type { Subject, Chapter } from '@/interfaces';


const activeSubject: Ref<string> = ref("")
const tableData: Ref<Chapter[]> = ref([]);
const subjectList: Subject[] = [
    {
        id: 1,
        name: "Bengali 1st Paper",
        slug: 'bangla-1',
        group: 'regular'
    },
    {
        id: 2,
        name: "Bengali 2nd Paper",
        slug: 'bangla-2',
        group: 'regular'
    },
    {
        id: 3,
        name: "English 1st Paper",
        slug: 'english-1',
        group: 'regular'
    },
    {
        id: 4,
        name: "English 2nd Paper",
        slug: 'english-2',
        group: 'regular'
    },
    {
        id: 5,
        name: "Physics 1st Paper",
        slug: 'physics-1',
        group: 'science'
    },
    {
        id: 6,
        name: "Physics 2nd Paper",
        slug: 'physics-2',
        group: 'science'
    },
    {
        id: 7,
        name: "Chemistry 1st Paper",
        slug: 'chemistry-1',
        group: 'science'
    },
    {
        id: 8,
        name: "Chemistry 2nd Paper",
        slug: 'chemistry-2',
        group: 'science'
    },
    {
        id: 9,
        name: "Biology 1st Paper",
        slug: 'biology-1',
        group: 'science'
    },
    {
        id: 10,
        name: "Biology 2nd Paper",
        slug: 'biology-2',
        group: 'science'
    },
    {
        id: 11,
        name: "Higher-Maths 1st Paper",
        slug: 'higher-maths-1',
        group: 'science'
    },
    {
        id: 12,
        name: "Higher-Maths 2nd Paper",
        slug: 'higher-maths-2',
        group: 'science'
    },
]

const chapterData: Chapter[] = [
    {
        id: 1,
        number: 1,
        name: "My Chapter",
        subject_id: 1,
        progress: 0,
        cq: false,
        mcq: true
    },
    {
        id: 2,
        number: 2,
        name: "My Chapter #2",
        subject_id: 3,
        progress: 25,
        mcq: false,
        cq: true
    },
    {
        id: 3,
        number: 3,
        name: "My Chapter #3",
        subject_id: 1,
        progress: 85,
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
                        <el-menu-item index="bangla-1">Bengali 1st Paper</el-menu-item>
                        <el-menu-item index="bangla-2">Bengali 2nd Paper</el-menu-item>
                        <el-menu-item index="english-1">English 1st Paper</el-menu-item>
                        <el-menu-item index="english-2">English 2nd Paper</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <Magnet />
                            </el-icon>
                            Science
                        </template>
                        <el-menu-item index="physics-1">Physics 1st Paper</el-menu-item>
                        <el-menu-item index="physics-2">Physics 2nd Paper</el-menu-item>
                        <el-menu-item index="chemistry-1">Chemistry 1st Paper</el-menu-item>
                        <el-menu-item index="chemistry-2">Chemistry 2nd Paper</el-menu-item>
                        <el-menu-item index="higher-maths-1">Higher-Maths 1st Paper</el-menu-item>
                        <el-menu-item index="higher-maths-2">Higher-Maths 2nd Paper</el-menu-item>
                        <el-menu-item-group title="Fourth Subjects">
                            <el-menu-item index="biology-1">Biology 1st Paper</el-menu-item>
                            <el-menu-item index="biology-2">Biology 2nd Paper</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-col>
            <el-col :span="24" :md="17" :lg="18" :xl="20" class="pt-1 md:pt-0">
                <h3 class="pt-4 pb-3 md:py-5 text-3xl">{{ activeSubject }}</h3>
                <el-scrollbar>
                    <el-table class="rounded-xl" :data="tableData">
                        <el-table-column prop="number" label="Chapter" />
                        <el-table-column prop="name" label="Name" />
                        <el-table-column prop="progress" label="Completion">
                            <template #default="scope">
                                <el-progress :text-inside="true" :stroke-width="16" :percentage="scope.row.progress" />
                            </template>
                        </el-table-column>
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
                </el-scrollbar>
            </el-col>
        </el-row>
    </div>

</template>