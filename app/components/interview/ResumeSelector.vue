<template>
    <div class="flex flex-col gap-4">
        <!-- 简历选择区域 -->
        <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
				<slot name="title">
					<h3 class="text-sm font-semibold text-neutral-900">选择已有简历</h3>
				</slot>

                <UButton
                    v-if="userStore.resumes.length <= 5"
                    color="primary"
                    variant="ghost"
                    icon="i-heroicons-plus"
                    @click="showUploadResumeModal = true"
                >上传新简历</UButton>
                <span v-else class="text-sm text-gray-500">
                    最多上传 5 份简历
                </span>


            </div>

        </div>


        <!-- 简历列表 -->
        <div v-if="userStore.resumes.length > 0" class="flex flex-col gap-2">
            <div
                v-for="resume in userStore.resumes"
                :key="resume.id"
                @click="selectResume(resume)"
                class="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
            >
                <!-- 文件图标 -->
                <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-primary-500 shrink-0" />

                <!-- 简历名称 -->
                <span class="flex-1 text-sm text-gray-800 truncate">{{ resume.resumeName }}</span>

                <!-- 悬浮操作按钮 -->
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <UTooltip text="预览简历">
                        <UButton
                            variant="ghost"
                            color="neutral"
                            size="xs"
                            icon="i-heroicons-eye"
                            @click.stop="handlePreview(resume)"
                        />
                    </UTooltip>
                    <UTooltip text="删除简历">
                        <UButton
                            variant="ghost"
                            color="error"
                            size="xs"
                            icon="i-heroicons-trash"
                            @click.stop="handleDelete(resume)"
                        />
                    </UTooltip>
                </div>
            </div>
        </div>

        <!-- 空状态 -->
  			<div v-else
				class="flex flex-col items-center justify-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
				<UIcon name="i-heroicons-document-text" class="w-10 h-10 mb-2" />
				<p class="text-sm">暂无简历</p>
				<UButton v-if="userStore.canAddResume" color="primary" variant="ghost" size="sm" class="mt-2"
					@click="showUploadResumeModal = true">
					立即上传
				</UButton>
			</div>
    </div>


    <!-- 上传简历弹窗 -->
     <UploadResumeModal v-model:open="showUploadResumeModal"></UploadResumeModal>
</template>

<script setup lang="ts">
import UploadResumeModal from '../profile/UploadResumeModal.vue';


const showUploadResumeModal = ref(false)
const userStore = useUserStore()
const interviewStore = useInterviewStore()

// 假数据
userStore.resumes = [
    { id: 1, resumeName: '前端工程师简历_2026', url: '' },
    { id: 2, resumeName: '全栈开发工程师简历', url: '' },
    { id: 3, resumeName: 'Java后端开发_应届生版本', url: '' },
]

const selectResume = (resume: any) => {
    interviewStore.resumeId = resume.id
}



function handlePreview(resume: any) {
    // TODO: 预览简历逻辑
    console.log('preview', resume)
}

function handleDelete(resume: any) {
    // TODO: 删除简历逻辑
    console.log('delete', resume)
}
</script>

<style scoped>

</style>