import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SERVICE, SERVICE_STEP } from '~/constants'

export const useInterviewStore = defineStore(
    'interview',
    () => {
        // 侧边栏是否打开
        const isSidebarOpen = ref(false)
        // 当前步骤：1-选择岗位和简历, 2-面试中, 3-查看报告
        const currentStep = ref<SERVICE_STEP>(SERVICE_STEP.Select)
        // 选中的服务类型：
        const selectedService = ref<SERVICE | null>(null)


        return {
            isSidebarOpen,
            currentStep,
            selectedService
        }
    },
    {
        persist: true
    }
)
