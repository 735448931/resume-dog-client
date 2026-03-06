<template>
	<div class="relative">
		<!-- 切换按钮 -->
		<div class="absolute right-0 translate-x-[50%] top-[50%] translate-y-[-50%] z-30">
			<UButton
            :icon="interviewStore.isSidebarOpen ? 'i-lucide-menu' : 'i-lucide-chevron-right'" variant="solid" @click="toggleSidebar" />
		</div>

        <aside
            class="h-full border-r border-slate-200 
            flex flex-col shrink-0 z-10 transition-[width] duration-300 ease-in-out will-change-[width] overflow-hidden"
            :class="interviewStore.isSidebarOpen ? 'w-65 lg:w-72' : 'w-0 border-r-0'">

            <div class="py-6 px-4 pb-2">
                <div class="flex items-center gap-3 mb-6">
                    <div
                        class="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-200">
                        <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" />
                    </div>
                    <div>
                        <h1 class="font-bold text-slate-900 text-lg leading-tight mb-1">
                            面试汪：全链路 AI 服务
                        </h1>
                        <p class="text-xs text-slate-500">押题·模拟·行测 三位一体</p>
                    </div>
                </div>

                <div class="px-1">
                    <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        极简三步，快速开始
                    </h2>
                </div>
            </div>
            

        </aside>
	</div>
</template>

<script setup lang="ts">
const toggleSidebar = () => { }

const interviewStore = useInterviewStore()

const steps = [
	{
		id: 1,
		title: '选择岗位与简历',
		summary: '定位目标岗位，导入简历'
	},
	{
		id: 2,
		title: '开启专项服务形态',
		summary: '根据不同服务形态，模拟真实场景'
	},
	{
		id: 3,
		title: '查看分析报告',
		summary: '多维度评估与提升计划'
	}
]

const isHistory = ref()
const isAllowClick = (step:any) => {
	if (isHistory.value) {
		return false
	}
	return step.id <= interviewStore.currentStep
}

</script>

<style scoped></style>
