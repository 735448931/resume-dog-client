

<template>
    <UModal v-model:open="isOpen" :ui="{ content: 'max-w-[880px]' }" @after-leave="onClose">
        <template #header>
            <div>
                <h3 class="text-base font-semibold text-gray-900">选择下一步体验</h3>
                <p class="text-sm text-gray-500 mt-0.5">根据目标需求选择想要开启的服务形态，每项都会引导至对应的体验流程</p>
            </div>
        </template>

        <template #body>
            <div class="flex flex-col gap-3 p-1">
                <div
                    v-for="item in serviceHighlights"
                    :key="item.id"
                    class="group relative flex flex-col gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200"
                    :class="selectedService === item.id
                        ? 'border-primary-400 bg-primary-50 shadow-md shadow-primary-100'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'"
                    @click="interviewStore.selectedService = item.id"
                >
                    <!-- 选中角标 -->
                    <div
                        v-if="selectedService === item.id"
                        class="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                    >
                        <UIcon name="i-heroicons-check" class="w-3 h-3 text-white" />
                    </div>

                    <!-- 图标 + 标题 + badge -->
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                            <UIcon :name="item.icon" class="w-5 h-5 text-primary-600" />
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-gray-900 text-sm">{{ item.title }}</span>
                            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-600 font-medium">{{ item.badge }}</span>
                        </div>
                    </div>

                    <!-- 描述 -->
                    <p class="text-xs text-gray-500 leading-relaxed">{{ item.description }}</p>

                    <!-- 要点列表 -->
                    <ul class="flex flex-col gap-1.5">
                        <li
                            v-for="point in item.points"
                            :key="point"
                            class="flex items-start gap-1.5 text-xs text-gray-600"
                        >
                            <UIcon name="i-heroicons-check-circle" class="w-3.5 h-3.5 text-primary-400 mt-0.5 shrink-0" />
                            <span>{{ point }}</span>
                        </li>
                    </ul>

                    <!-- 底部亮点 -->
                    <div class="pt-2 border-t border-gray-100 flex items-center gap-1.5">
                        <UIcon name="i-heroicons-sparkles" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span class="text-[11px] text-gray-400">{{ item.highlight }}</span>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3 w-full">
                <UButton variant="ghost" color="neutral" @click="onClose">取消</UButton>
                <UButton color="primary" :disabled="!selectedService" @click="handleConfirm">
                    立即开启
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                </UButton>
            </div>
        </template>
    </UModal>
</template>


<script setup lang="ts">
import { serviceHighlights } from '~/constants'

const isOpen = defineModel<boolean>('open', { default: false })
const selectedService = ref<string | null |  number>(null)

const interviewStore = useInterviewStore()



const emit = defineEmits<{
    confirm: [serviceId: string | number]
}>()

function handleConfirm() {
    if (!selectedService.value) return
    emit('confirm', selectedService.value)
    isOpen.value = false
}

function onClose() {
    isOpen.value = false
    selectedService.value = null
}
</script>