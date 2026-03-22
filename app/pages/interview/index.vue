<template>
    <div class="h-full flex flex-col gap-6 w-full">
        <!-- 面试押题 - 输入步骤 -->
        <StepInput v-if="currentStep === 'input'" :service-type="currentServiceType" @submit="handleSubmit" />

        <!-- 面试押题 - 进度条展示 -->
        <StepProgress v-if="currentStep === 'progress'" ref="stepProgressRef"
            :current-progress-step="currentProgressStep" :unique-progress-steps="uniqueProgressSteps" />

        <!-- 专项面试 - 面试界面 -->
        <StepInterview v-if="currentStep === 'interview'" :service-type="currentServiceType"
            @endInterview="handleEndInterview" />

        <!-- 完成步骤 - 展示结果 -->
        <StepComplete v-if="currentStep === 'complete'" :service-type="currentServiceType"
            :prediction-results="predictionResults" :prediction-summary="predictionSummary" @next-step="handleNextStep"
            @navigate-history="navigateTo('/history')" />

        <!-- 错误步骤 -->
        <StepError v-if="currentStep === 'error'" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch, nextTick, onMounted } from 'vue'
import { navigateTo, useRoute, useRouter } from '#imports'
import { useInterviewStore } from '@/stores/interview'
import { useUserStore } from '@/stores/user'
import { SERVICE } from '@/constants'

// 导入步骤组件
import StepInput from '@/components/interview/resume-quiz/StepInput.vue'
import StepProgress from '@/components/interview/resume-quiz/StepProgress.vue'
import StepInterview from '@/components/interview/special-quiz/StepInterview.vue'
import StepComplete from '@/components/interview/resume-quiz/StepComplete.vue'
import StepError from '@/components/interview/resume-quiz/StepError.vue'

definePageMeta({
    requiresAuth: true,
    layout: 'interview'
})

const route = useRoute()
const router = useRouter()
const interviewStore = useInterviewStore()
const userStore = useUserStore()
const toast = useToast()

// 从 URL query 中读取服务类型：resume | special
const currentServiceType = computed(() => {
    const type = route.query.serviceType as string
    if (['resume', 'special'].includes(type)) {
        return type
    }
    return 'resume'
})

// 从 URL query 中读取当前步骤
const currentStep = computed(() => {
    const step = route.query.step as string
    const validSteps = ['input', 'progress', 'interview', 'complete', 'error']
    if (validSteps.includes(step)) {
        return step
    }
    return 'input'
})

// 更新 URL query 参数
const updateQuery = (updates: Record<string, any>) => {
    const isComplete = updates.step === 'complete'
    router.push({
        query: {
            ...route.query,
            ...updates,
        }
    })
}

// ==================== 进度条相关 ====================
const stepProgressRef = ref<any>(null)
const currentProgressStep = ref({
    progress: 0,
    label: '正在准备...',
    stage: 'prepare'
})
const progressSteps = ref<any[]>([])

const uniqueProgressSteps = computed(() => {
    const unique: any[] = []
    const seenLabels = new Set<string>()
    for (const step of progressSteps.value) {
        if (!seenLabels.has(step.label)) {
            seenLabels.add(step.label)
            unique.push(step)
        }
    }
    return unique
})

const progressStepsContainer = computed(
    () => stepProgressRef.value?.progressStepsContainer
)

watch(uniqueProgressSteps, async () => {
    await nextTick()
    const container = progressStepsContainer.value
    if (container) {
        container.scrollTop = container.scrollHeight
    }
})

// ==================== 通用数据 ====================
let resultId = ''
const predictionResults = ref<any[]>([])
const predictionSummary = ref('')

// ==================== 处理提交 ====================
const handleSubmit = () => {
    const serviceType = currentServiceType.value
    if (serviceType === 'resume') {
        startResumeQuiz()
    } else {
        startInterview(serviceType)
    }
}

// ==================== 面试押题流程 ====================
const startResumeQuiz = async () => {
    updateQuery({ step: 'progress' })
    currentProgressStep.value = { progress: 0, label: '正在准备...', stage: 'prepare' }
    progressSteps.value = []
    predictionResults.value = []
    predictionSummary.value = ''

    // TODO: 对接 generateResumeQuizSSE，参考 mianshiwang-nuxt 中的实现
}

// ==================== 专项面试流程 ====================
const startInterview = (serviceType: string) => {
    interviewStore.selectedService = serviceType === 'special' ? SERVICE.Special : SERVICE.Resume
    updateQuery({ step: 'interview' })
}

const handleEndInterview = async (interviewResultId: string) => {
    resultId = interviewResultId
    try {
        // TODO: 调用获取面试结果 API
        // const res = await getMockInterviewQAResultAPI($api, interviewResultId)
        // predictionResults.value = res.questions
        updateQuery({ step: 'complete' })
    } catch (error: any) {
        console.error('获取面试结果失败:', error)
        toast.add({
            title: '获取结果失败',
            description: error?.message || '请稍后重试',
            color: 'error'
        })
    }
}

// ==================== 查看报告 ====================
const handleNextStep = async () => {
    const finalResultId = resultId || (route.query.resultId as string)
    if (!finalResultId) {
        toast.add({ title: '无法跳转', description: '缺少结果 ID', color: 'error' })
        return
    }
    navigateTo(
        `/interview/report?resultId=${finalResultId}&serviceType=${route.query.serviceType}&history=${route.query.history}`
    )
}

// ==================== 初始化 ====================
onMounted(() => {
    initInterview()
})

const initInterview = async () => {
    const historyResultId = route.query.resultId as string
    const isHistory = route.query.history
    if (historyResultId && isHistory) {
        resultId = historyResultId
        try {
            // TODO: 根据服务类型加载历史数据
            if (currentStep.value !== 'complete') {
                updateQuery({ step: 'complete' })
            }
        } catch (error: any) {
            console.error('加载历史记录失败:', error)
            toast.add({
                title: '加载失败',
                description: error?.message || '请稍后重试',
                color: 'error'
            })
        }
    } else {
        if (!route.query.step) {
            updateQuery({ step: 'input' })
        }
    }
}
</script>

<style scoped></style>
