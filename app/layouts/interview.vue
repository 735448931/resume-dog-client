<template>
    <div class="h-screen bg-slate-50 flex overflow-hidden">
        <InterviewSidebar />
        <main class="flex-1 flex flex-col h-full ">
            <header class="h-16 px-6 border-b border-slate-200 bg-white/50
            flex items-center justify-between shrink-0 sticky top-0 z-20">

                <div class="flex items-center gap-2 text-slate-500 text-sm">
                    <NuxtLink @click="goHome" class="flex items-center gap-1">
                        <UIcon name="i-heroicons-home" class="w-4 h-4" />
                        <span>首页</span>
                    </NuxtLink>
                    <span class="text-slate-300">/</span>
                    <span class="text-slate-900 font-medium">{{ pageTitle }}</span>
                </div>

                <div class="flex items-center gap-4">
                    <div
                        class="text-xs text-slate-400 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        AI 服务在线
                    </div>
                </div>

            </header>



            <!-- 内容区域 -->
            <div class="flex-1 px-4 py-2 overflow-hidden w-full flex flex-col max-w-[1600px] bg-slate-100 ">
                <slot />
            </div>

        </main>
    </div>
</template>

<script setup lang="ts">
import { useRoute, navigateTo, useToast } from '#imports'
const route = useRoute()
const interviewStore = useInterviewStore()
const goHome = () => {

}


// 页面标题映射
const pageTitle = computed(() => {
    if (route.path === '/interview/start') {
        return '选择岗位与简历'
    }

    // 处理统一的 /interview 页面
    // if (route.path === '/interview' || route.path === '/interview/') {
    // 	const serviceType = route.query.serviceType
    // 	if (serviceType === SERVICE_TAGS.RESUME) {
    // 		return serviceHighlights[0].title
    // 	} else if (serviceType === SERVICE_TAGS.SPECIAL) {
    // 		return serviceHighlights[1].title
    // 	} else if (serviceType === SERVICE_TAGS.BEHAVIOR) {
    // 		return serviceHighlights[2].title
    // 	} else {
    // 		return '未知路径'
    // 	}
    // }
})

const fetchUserInfo = async () => {
    try {
        
    } catch (error) {
        
    }
}

// 处理路由跳转逻辑
const handleNavigate = async () => {
    const currentPath = route.path

    // 服务页面守卫
    if (isEmpty(interviewStore.selectedPosition) && !route.query.resultId) {
        navigateTo('/interview/start')
        return
    }
}


onMounted(() => {
    handleNavigate()
})

</script>

<style scoped></style>