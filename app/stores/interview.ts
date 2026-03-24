import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SERVICE, SERVICE_STEP } from '~/constants'

export const useInterviewStore = defineStore(
    'interview',
    () => {
        // 侧边栏是否打开
        const isSidebarOpen = ref(true)
        // 当前步骤：1-选择岗位和简历, 2-面试中, 3-查看报告
        const currentStep = ref<SERVICE_STEP>(SERVICE_STEP.Select)
        // 选中的服务类型：
        const selectedService = ref<SERVICE | null>(null)


        // 面试中进度类型
        const interviewEventType = ref<'start' | 'question' | 'waiting' | 'thinking' | 'end' | 'error' | null>('start')

        const selectedPosition = ref()

        const resumeId = ref(null)

        // 所有的对话合集
        const messages: any = ref([])
        
        // 会话 ID 
        const sessionId = ref(null)


        // 第二步：面试过程
        // idle：未进入面试状态，不需要关心
        // starting：面试已经开始，但是费用暂未扣除，处于倒计时阶段
        // in_progress：面试已经开始，费用已经扣除。此时用户进入服务页面，将直接跳转到面试页面
        // suspend：用户点击了暂停面试的按钮，但并不意味着面试结束
        // ended：面试已经结束
        const interviewStatus = ref<'idle' | 'starting' | 'in_progress' | 'suspend' | 'ended'>('idle')

        // 添加聊天内容
        const addMessage = (role:string,content:string,metadata = {}) => {
            messages.value.push({
                role,
                content,
                timeStamp: new Date(),
                ...metadata
            })
        }

        // 更新最后一条消息（用于流式输出）- 优化版
        const updateLastMessage = (content: any, role = 'interviewer') => {
            const lastMessage = messages.value[messages.value.length - 1]
            // 如果最后一条消息的角色匹配，则更新内容
            if (lastMessage && lastMessage.role === role) {
                lastMessage.content = content
            } else {
                // 否则创建新消息
                addMessage(role, content)
            }
        }


        return {
            isSidebarOpen,
            currentStep,
            selectedService,
            selectedPosition,
            resumeId,
            interviewEventType,
            addMessage,
            updateLastMessage,
            interviewStatus
        }
    },
    {
        persist: true
    }
)
