<script setup lang="ts">
defineProps({
    title: { type: String, required: true },
    progress: { type: Number, required: true },
    fluid: { type: Boolean, default: false },
    chapters: String,
    planned: String,
    MCQ: String,
    CQ: String,
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl" :class="fluid ? null : 'md:w-80'">
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
                    Chapters {{ chapters ?? '0' }}
                </div>
                <div class="badge badge-warning gap-2">
                    <el-icon>
                        <StarFilled />
                    </el-icon>
                    Planned {{ planned ?? '0' }}
                </div>
                <div v-if="MCQ != null" class="badge badge-success">MCQ {{ MCQ ?? '0' }}/{{ planned ?? '0' }}</div>
                <div v-if="CQ" class="badge badge-success">CQ {{ MCQ ?? '0' }}/{{ planned ?? '0' }}</div>
            </div>
        </div>
    </div>
</template>