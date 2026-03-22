<template>
    <div class="flex flex-col gap-4">
        <!-- 简历选择区域 -->
        <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
                <slot name="title">
                    <h3 class="text-sm font-semibold text-neutral-900">选择已有简历</h3>
                </slot>

                <UButton v-if="userStore.resumes.length <= 5" color="primary" variant="ghost" icon="i-heroicons-plus"
                    @click="showUploadResumeModal = true">上传新简历</UButton>
                <span v-else class="text-sm text-gray-500">
                    最多上传 5 份简历
                </span>


            </div>

        </div>

        <button @click="handleTest">{{ isStreaming ? '停止并重试' : '测试按钮' }}</button>
        <!-- 在下面的 div 中展示 -->
        <div class="min-h-24 border rounded p-3 text-sm whitespace-pre-wrap wrap-break-word">{{ sseContent }}</div>

        <!-- 简历列表 -->
        <div v-if="userStore.resumes.length > 0" class="flex flex-col gap-2">
            <div v-for="resume in userStore.resumes" :key="resume.id" @click="selectResume(resume)"
                class="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
                <!-- 文件图标 -->
                <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-primary-500 shrink-0" />

                <!-- 简历名称 -->
                <span class="flex-1 text-sm text-gray-800 truncate">{{ resume.resumeName }}</span>



                <!-- 悬浮操作按钮 -->
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <UTooltip text="预览简历">
                        <UButton variant="ghost" color="neutral" size="xs" icon="i-heroicons-eye"
                            @click.stop="handlePreview(resume)" />
                    </UTooltip>
                    <UTooltip text="删除简历">
                        <UButton variant="ghost" color="error" size="xs" icon="i-heroicons-trash"
                            @click.stop="handleDelete(resume)" />
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
const config = useRuntimeConfig()

const sseContent = ref('')
const isStreaming = ref(false)
let sseAbortController: AbortController | null = null

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

const handleTest = async () => {
    if (isStreaming.value) {
        sseAbortController?.abort()
    }

    sseContent.value = ''
    isStreaming.value = true
    sseAbortController = new AbortController()

    const params = {
        company: '大连承影科技有限公司',
        positionName: '前端工程师',
        minSalary: 8,
        maxSalary: 12,
        jd: '负责公司产品Web前端的设计、开发与维护，确保页面高性能、高可用及良好的用户体验。与UI/UX设计师、产品经理紧密协作，将视觉设计稿转化为高质量、跨浏览器兼容的代码。参与前端架构的优化，持续改进前端工程化、组件化及自动化构建流程，提升开发效率。对前端性能进行监控与调优，解决不同终端（PC、移动端）及不同浏览器下的兼容性问题。关注前端前沿技术，探索并引入新技术以提升产品竞争力。',
        resumeURL: 'https://testasset.darcg.cn//app/sharePoster/779378558238789_20260361052806569.pdf'
    }

    try {
        const headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'text/event-stream'
        })

        if (userStore.isLogin && userStore.token) {
            headers.set('Authorization', `Bearer ${userStore.token}`)
        }

        const response = await fetch(`${config.public.apiBase as string}/interview/resume/quiz/stream`, {
            method: 'POST',
            body: JSON.stringify(params),
            headers,
            credentials: 'include',
            signal: sseAbortController.signal
        })

        if (!response.ok) {
            throw new Error(`请求失败：${response.status}`)
        }

        if (!response.body) {
            throw new Error('当前环境不支持流式读取')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''

        while (true) {
            const { value, done } = await reader.read()
            if (done) {
                break
            }

            buffer += decoder.decode(value, { stream: true })
            const events = buffer.split('\n\n')
            buffer = events.pop() || ''

            for (const event of events) {
                const lines = event.split('\n')
                for (const line of lines) {
                    if (!line.startsWith('data:')) {
                        continue
                    }

                    const payload = line.slice(5).trim()
                    if (!payload || payload === '[DONE]') {
                        continue
                    }

                    let text = payload
                    try {
                        const parsed = JSON.parse(payload) as Record<string, any>
                        text = String(
                            parsed.content ??
                            parsed.text ??
                            parsed.delta ??
                            parsed.message ??
                            payload
                        )
                    } catch {
                        // 非 JSON 片段，直接按文本追加
                    }

                    sseContent.value += text
                }
            }

            // 兼容服务端直接返回纯文本分片
            if (!buffer.includes('data:') && !buffer.includes('\n\n')) {
                sseContent.value += buffer
                buffer = ''
            }
        }

        if (buffer.trim()) {
            sseContent.value += buffer
        }
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            sseContent.value += '\n\n[请求失败，请稍后重试]'
        }
    } finally {
        isStreaming.value = false
        sseAbortController = null
    }

}

</script>

<style scoped></style>