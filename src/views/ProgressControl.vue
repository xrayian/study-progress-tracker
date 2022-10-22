<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import type { Subject, Chapter } from '@/interfaces';
import { useStore } from 'vuex';
import router from '@/router';
import { collection, getDocs, getDoc, setDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '@/FirebaseInit'
import { VueSpinner } from 'vue3-spinners';

const store = useStore();
const activeSubject: Ref<string> = ref("")
const tableData: Ref<Chapter[]> = ref([]);
const subjectList: Ref<Subject[]> = ref([]);
const chapterData: Ref<Chapter[]> = ref([]);
const loadingComplete: Ref<boolean> = ref(false);
const tableRefreshingComplete: Ref<boolean> = ref(false);

const getSubjectData = async () => {
    const querySnapshot = await getDocs(query(collection(db, "subjects"), orderBy('name')));
    querySnapshot.forEach((doc) => {

        subjectList.value.push(
            {
                id: doc.id,
                group: doc.data().group,
                name: doc.data().name,
                slug: doc.data().slug
            }
        )
    });
}

const getChapterData = async (subjectId: string) => {
    const querySnapshot = await getDocs(query(collection(db, `subjects/${subjectId}/chapters`)));
    const newChapters: Chapter[] = [];
    querySnapshot.forEach((doc) => {
        const newChapter: Chapter = {
            id: doc.id,
            cq: false,
            mcq: false,
            planned: false,
            revised: false,
            name: doc.data().name,
            number: parseFloat(doc.data().number),
            subject_id: subjectId,
        };
        newChapters.push(newChapter);
    });
    chapterData.value = newChapters;
    await getProgressData();
    tableRefreshingComplete.value = true;
}

const getProgressData = async () => {
    const progressDoc = await getDoc(doc(db, `progress/${store.state.user.uid}`));
    if (progressDoc.exists()) {
        chapterData.value.forEach((chapter) => {
            try {
                chapter.mcq = progressDoc.data()[chapter.id].mcq ?? false;
                chapter.cq = progressDoc.data()[chapter.id].cq ?? false;
            } catch (e) {
                chapter.cq = false;
                chapter.mcq = false;
            }
            try {
                chapter.planned = progressDoc.data()[chapter.id].planned ?? false;
            } catch (e) {
                chapter.planned = false;
            }
            try {
                chapter.revised = progressDoc.data()[chapter.id].revised ?? false;
            } catch (e) {
                chapter.revised = false;
            }
        })
    }
}

async function updateTableData(subject_id: string) {
    const subjectChapters: Chapter[] = [];
    await getChapterData(subject_id);
    chapterData.value.forEach((chapter) => {
        if (chapter.subject_id == subject_id) {
            subjectChapters.push(chapter);
        }
    });
    tableData.value = subjectChapters
    loadingComplete.value = true;
}

const handleSelect = (key: string, keyPath: string[]) => {
    subjectList.value.forEach((subject) => {
        if (subject.slug == keyPath[1]) {
            activeSubject.value = subject.name
            tableRefreshingComplete.value = false;
            updateTableData(subject.id)
        }
    })
}

const postChapterState = async (chapter: Chapter, updateFor: string, val: boolean) => {
    const docRef = doc(db, "progress", store.state.user.uid);
    const obj: any = {};
    if (updateFor == "mcq") {
        obj[`${chapter.id}`] = { mcq: val, cq: chapter.cq, planned: chapter.planned, revised: chapter.revised }
    } else if (updateFor == "cq") {
        obj[`${chapter.id}`] = { mcq: chapter.mcq, cq: val, planned: chapter.planned, revised: chapter.revised }
    } else if (updateFor == "planned") {
        obj[`${chapter.id}`] = {
            mcq: chapter.mcq, cq: chapter.cq, planned: val, revised: chapter.revised
        }
    } else if (updateFor == "revised") {
        obj[`${chapter.id}`] = {
            mcq: chapter.mcq, cq: chapter.cq, planned: chapter.planned, revised: val
        }
    }
    try {
        await updateDoc(docRef, obj);
    } catch (e) {
        await setDoc(docRef, obj);
    }
}

const toggleMcq = (index: number, chapter: Chapter) => {
    postChapterState(chapter, 'mcq', !chapter.mcq).then(() => { chapter.mcq = !chapter.mcq });
}

const toggleCq = (index: number, chapter: Chapter) => {
    postChapterState(chapter, 'cq', !chapter.cq).then(() => { chapter.cq = !chapter.cq });
}

const togglePlanned = (index: number, chapter: Chapter) => {
    postChapterState(chapter, 'planned', !chapter.planned).then(() => { chapter.planned = !chapter.planned });
}

const toggleRevised = (index: number, chapter: Chapter) => {
    postChapterState(chapter, 'revised', !chapter.revised).then(() => { chapter.revised = !chapter.revised });
}

onMounted(async () => {
    if (store.state.user == null) {
        router.push('/')
    }
    await getSubjectData();
    handleSelect('0', ['0', 'bangla-1'])
})
</script>

<template>
    <div class="m-3">
        <el-row v-if="loadingComplete" :gutter="20">
            <el-col :span="24" :md="7" :lg="6" :xl="4">
                <el-menu class="rounded-xl py-2" :default-openeds="['1', '2']" default-active="bangla-1"
                    @select="handleSelect">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <Management />
                            </el-icon>Basic
                        </template>
                        <template v-if="subjectList.length">
                            <template v-for="subject in subjectList" :key="subject.id">
                                <template v-if="subject.group == 'regular'">
                                    <el-menu-item :index="subject.slug">{{ subject.name }}</el-menu-item>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            <el-menu-item>
                                <vue-spinner size='20' class="mx-auto" />
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <Magnet />
                            </el-icon>
                            Science
                        </template>
                        <template v-if="subjectList.length">
                            <template v-for="subject in subjectList" :key="subject.id">
                                <template v-if="subject.group == 'science'">
                                    <el-menu-item :index="subject.slug">{{ subject.name }}</el-menu-item>
                                </template>
                            </template>
                        </template>
                    </el-sub-menu>
                </el-menu>
            </el-col>
            <el-col :span="24" :md="17" :lg="18" :xl="20" class="pt-1 md:pt-0">
                <h3 class="pt-4 pb-3 md:py-5 text-3xl">{{ activeSubject }}</h3>
                <div class="overflow-x-auto">
                    <template v-if="tableRefreshingComplete">
                        <el-table table-layout="auto" class="rounded-xl" :data="tableData"
                            :default-sort="{ prop: 'number', order: 'ascending' }">
                            <el-table-column prop="number" label="#" />
                            <el-table-column prop="name" label="Name" />
                            <el-table-column label="Progress">
                                <el-table-column prop="planned" label="Planned" sortable>
                                    <template #default="scope">
                                        <el-button size="small" :type="scope.row.planned ? 'warning' : 'default'"
                                            @click="togglePlanned(scope.$index, scope.row)">
                                            <el-icon :size="18">
                                                <StarFilled v-if="scope.row.planned" />
                                                <Star v-else />
                                            </el-icon>
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="revised" label="Revised" sortable>
                                    <template #default="scope">
                                        <el-button size="small" :type="scope.row.revised ? 'primary' : 'default'"
                                            @click="toggleRevised(scope.$index, scope.row)">
                                            <el-icon :size="18">
                                                <VideoCameraFilled v-if="scope.row.planned" />
                                                <VideoCameraFilled v-else />
                                            </el-icon>
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="mcq" label="MCQ" sortable>
                                    <template #default="scope">
                                        <el-button size="small" :type="scope.row.mcq ? 'success' : 'default'"
                                            @click="toggleMcq(scope.$index, scope.row)">
                                            <el-icon :size="18">
                                                <Check />
                                            </el-icon>
                                        </el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cq" label="CQ" sortable>
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
                    </template>
                    <div class="mx-auto my-20 " v-else>
                        <vue-spinner size='40' class="mx-auto" />
                    </div>
                </div>
            </el-col>
        </el-row>
        <div v-else>
            <vue-spinner class="mx-auto my-32" size="50" />
        </div>
    </div>
</template>