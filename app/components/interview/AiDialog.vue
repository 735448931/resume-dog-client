<template>
    <div class="p-6 border-b border-gray-100">
        <h3 class="font-semibold text-neutral-900">AI 面试对话</h3>
    </div>
    <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="messagesContainerRef">
        
    </div>
    <div class="p-4 border-t border-gray-100 flex gap-3">
        <UInput class="flex-1" placeholder="请输入..." v-model="inputValue" />
        <UButton color="primary" size="lg" icon="i-heroicons-paper-airplane" @click="sendMessage">
            发送
        </UButton>
    </div>
</template>

<script setup lang="ts">
import { answerInterviewQuestionAPI } from '~/api/interview'


const interviewStore = useInterviewStore()
const userStore  = useUserStore()

// 当前输入框的内容
const inputValue = ref('')

const messagesContainerRef = ref<HTMLElement | null>(null)

// 当前状态是否可以发送消息
const canSendMessage = computed(() => {
    return true
})

// 发送消息
const sendMessage = async () => {
    if (!inputValue.value.trim() || !canSendMessage.value) {
        return
    }

    const userMessage = inputValue.value.trim()
    interviewStore.addMessage('candidate', userMessage)
    inputValue.value = ''

    scrollToBottom()

    // 获取配置
    const config = useRuntimeConfig()


    try {
        const params = {}
        answerInterviewQuestionAPI(params, {
            token: userStore.token,
            baseURL: config.public.apiBase,
            callbacks: {
                onmessage: (message: any) => {
                    const { type, content } = message 
                    // 提问
                    if (type === 'question') {
                        interviewStore.interviewEventType = 'question'
                        // 更新最后一条面试官消息（流式追加）
                        interviewStore.updateLastMessage(content, 'interviewer')
                        scrollToBottom()
                
                    } else if (type === 'waiting') {
                        // 等待候选人回答
                        interviewStore.interviewEventType = 'waiting'
                    } else if (type === 'end') {
                        // 面试结束
                        interviewStore.interviewEventType = 'end'
                        interviewStore.interviewStatus = 'ended'
                    }
                }
            }
        })
    } catch (error) {
        
    }





    
}

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainerRef.value) {
        messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight
    }    
}

</script>

<style scoped></style>