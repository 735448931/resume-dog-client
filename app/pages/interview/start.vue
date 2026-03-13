<template>
    <div class="flex flex-col h-full gap-6">

        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-xl font-bold text-neutral-900 mb-1">选择岗位和导入简历</h2>
                <div class="text-neutral-600 text-sm">锁定目标岗位并导入简历，AI 将定制专属题库</div>
            </div>
            <div class="flex items-center">
                <UIcon name="i-heroicons-sparkles" class="w-4 h-4 text-primary-500" />
                <span>一步完成岗位筛选与资料上传</span>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="grid grid-cols-2 gap-6 flex-1 min-h-0">
            <!-- 左侧 岗位选择 -->
            <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col min-h-0">
                <h2 class="text-lg font-semibold text-neutral-900 mb-4">选择岗位</h2>
                <UInput v-model="searchQuery" placeholder="搜索岗位名称或描述..." icon="i-heroicons-magnifying-glass" size="lg"
                    class="mb-4" @input="handleSearch" />

                <!-- 快速分类筛选 -->
                <div class="mb-4">
                    <p class="text-xs text-neutral-500 mb-2">快速筛选</p>
                    <div class="flex flex-wrap gap-2">
                        <UButton v-for="category in categories.slice(0, 6)" :key="category.key"
                            :variant="activeCategory === category.key ? 'solid' : 'ghost'" color="neutral"
                            @click="handleCategoryFilter(category.key)">
                            {{ category.label }}
                        </UButton>

                        <UButton @click="showAllCategories = !showAllCategories" :icon="showAllCategories ? 'i-heroicons-chevron-up'
                            : 'i-heroicons-chevron-down'" color="neutral" variant="ghost">
                            <span>
                                {{ showAllCategories ? '收起' : '更多' }}
                            </span>
                            <span class="text-[10px] opacity-60 ml-0.5">
                                ({{ categories.length - 6 }})
                            </span>
                        </UButton>
                    </div>

                    <div v-if="showAllCategories" class="flex flex-wrap gap-2 mt-2 animate-in">
                        <UButton v-for="category in categories.slice(6)" :key="category.key"
                            :variant="activeCategory === category.key ? 'solid' : 'ghost'" color="neutral"
                            @click="handleCategoryFilter(category.key)">
                            {{ category.label }}
                        </UButton>
                    </div>
                </div>

                <!-- 岗位列表 -->
                <div class="flex-1 overflow-hidden flex flex-col ">
                    <span class="text-xs text-neutral-500 mb-2">
                        {{ filteredPositions.length > 0 ? `或从下方列表中选择（${filteredPositions.length} 个岗位` :
                        '暂无匹配的岗位，请尝试其他搜索条件' }}
                    </span>

                    <div v-if="filteredPositions.length > 0" class="flex gap-2 flex-col overflow-auto flex-1">
                        <div :class="{
                            'border-primary-300 bg-primary-50/50 shadow-sm':
                                item.positionId === interviewStore.selectedPosition?.id
                        }" class="p-3 rounder-lg border cursor-pointer transition-all border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 hover:shadow-sm"
                            v-for="item in filteredPositions" :key="item.id"
                            @click="selectPosition(item)"
                            >

                            <div class="flex items-center justify-between gap-2">
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-medium text-neutral-900 text-sm mb-1 truncate">
                                        {{ item.positionName }}
                                        <span v-if="getCategoryLabel(item.category)"
                                            class="ml-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500">
                                            {{ getCategoryLabel(item.category) }}
                                        </span>
                                    </h3>
                                    <p class="text-xs text-neutral-600 line-clamp-1 mb-1">
                                        {{ item.description }}
                                    </p>
                                </div>
                                <UIcon :name="item.positionId === interviewStore.selectedPosition?.id
                                    ? 'i-heroicons-check-circle'
                                    : 'i-heroicons-chevron-right'
                                    " class="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" :class="{
                                        'text-primary-500 w-5 h-5':
                                            item.positionId ===
                                            interviewStore.selectedPosition?.id
                                    }" />
                            </div>

                        </div>
                    </div>


                    <div v-else class="flex-1 flex items-center justify-center py-8">
                        <div class="text-center">
                            <UIcon name="i-heroicons-magnifying-glass" class="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <p class="text-sm text-neutral-400">未找到匹配的岗位</p>
                            <p class="text-xs text-neutral-400 mt-1">
                                尝试调整搜索关键词或选择其他分类
                            </p>
                        </div>
                    </div>
                </div>


            </div>

            <!-- 右侧 简历导入 -->
            <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col min-h-0">
                <div class="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
                    <ResumeSelector>
                        <template #title>
                            <h2 class="text-lg font-semibold text-neutral-900">
                                选择简历
                                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {{ userStore.resumes.length }}/5
                                </span>
                            </h2>
                        </template>
                    </ResumeSelector>
                </div>

				<div class="pt-4 border-t border-gray-200 mt-4">
					<UButton color="primary" size="lg" block @click="handleNext">
						下一步：开启专项服务
					</UButton>
				</div>

            </div>

        </div>
    </div>

    <!-- 选择下一步弹窗 -->
    <ServiceSelectModal v-model:open="showNextModal" @confirm="handleStartService" />
</template>

<script setup lang="ts">
import jobCatalog from '@/data/job-categories.json'
import ResumeSelector from '~/components/interview/ResumeSelector.vue'
import ServiceSelectModal from '~/components/interview/ServiceSelectModal.vue'
import { SERVICE } from '~/constants'

const interviewStore = useInterviewStore()
const userStore = useUserStore()

const showNextModal = ref(false)

async function handleStartService(serviceId: string | number) {

    if (serviceId === SERVICE.Resume) {
        await navigateTo('/interview?serviceType=resume&step=input')
    } else if (serviceId === SERVICE.Special) {
        await navigateTo('/interview?serviceType=special&step=input')
    }

}

definePageMeta({
    layout: 'interview'
})

// 当前激活分类
const activeCategory = ref('all')
// 搜索参数
const searchQuery = ref('')
// 是否显示全部分类
const showAllCategories = ref(false)


// 所有分类
const categories = [
    { key: 'all', label: '全部' },
    ...jobCatalog.categories.map(item => ({
        key: item.key,
        label: item.label
    }))
]
// 所有职位
const positions = ref(
    jobCatalog.positions.map((position, index) => (
        {
            ...position,
            id: position.positionId
        }
    ))
)

const getCategoryLabel = (category:any) => {
	const cat = categories.find((c) => c.key === category)
	return cat ? cat.label : category
}


const filteredPositions = computed(() => {
    let result = positions.value

    // 按分类过滤
    if (activeCategory.value !== 'all') {
        result = result.filter((p) => p.category === activeCategory.value)
    }

    // 按搜索关键词过滤
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        console.log('result', result)

        result = result.filter(
            (p) =>
                p.positionName.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
        )
    }

    return result
})

const selectPosition = (item:any) => {
	interviewStore.selectedPosition = item
}

// 分类筛选处理
const handleCategoryFilter = (categoryKey: any) => {
    activeCategory.value = categoryKey
    searchQuery.value = '' // 清空搜索
}

const canProceed = computed(() => {
	return interviewStore.selectedPosition && interviewStore.resumeId
})

const handleNext = () => {
    if (!canProceed.value) {
        return
    }
    showNextModal.value = true
}

const handleSearch = () => {
    // 搜索时自动清除分类筛选
    // if (searchQuery.value.trim()) {
    // 	activeCategory.value = 'all'
    // }
}

</script>

<style scoped></style>