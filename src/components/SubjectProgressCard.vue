<script setup lang="ts">
import type { SubjectDashboardData } from '@/interfaces';
import type { PropType } from 'vue';
defineProps({
    title: { type: String, required: true },
    progress: { type: Number, required: true },
    fluid: { type: Boolean, default: false },
    data: { type: Object as PropType<SubjectDashboardData>, required: true }
})
</script>

<template>
    <div class="card" :class="fluid ? 'glass' : 'md:w-72 bg-base-300 shadow-lg shadow-base-200'">
        <figure class="px-10 pt-10 !justify-start">
            <div class="radial-progress" :style="`--value:${progress}; --thickness: 0.25rem`">{{ progress
            }}%</div>
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            <div class="card-actions">
                <div class="badge badge-info gap-2">
                    <el-icon>
                        <List />
                    </el-icon>
                    Chapters {{ data.chapters ?? '0' }}
                </div>
                <div v-if="data.planned" class="badge badge-warning gap-2">
                    <el-icon>
                        <StarFilled />
                    </el-icon>
                    Planned {{ data.planned ?? '0' }}
                </div>
                <div v-if="data.mcqFinished != null && data.mcqFinished > 0" class="badge badge-success">MCQ {{
                        data.mcqFinished ?? '0'
                }}/{{
        data.planned == 0 ? data.chapters : data.planned
}}
                </div>
                <div v-if="data.cqFinished != null && data.cqFinished > 0" class="badge badge-success">CQ {{
                        data.cqFinished ?? '0'
                }}/{{
        data.planned == 0 ? data.chapters : data.planned
}}
                </div>
            </div>
        </div>
    </div>
</template>