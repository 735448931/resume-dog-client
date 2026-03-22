<template>
    <div class="h-full flex flex-col gap-6">
        <div class="grid lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-6 flex-1 min-h-0">
            <!-- 左侧：AI 对话区域（占 2 列） -->
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col min-h-0 overflow-hidden">
                <!-- TODO: 替换为 AIDialogue 组件 -->
                <div class="p-6 border-b border-gray-100">
                    <h3 class="font-semibold text-neutral-900">AI 面试对话</h3>
                </div>
                <div class="flex-1 overflow-y-auto p-6 space-y-4">
                    <!-- 对话内容区 -->
                </div>
                <div class="p-4 border-t border-gray-100 flex gap-3">
                    <UInput class="flex-1" placeholder="请输入您的回答..." size="lg" />
                    <UButton color="primary" size="lg" icon="i-heroicons-paper-airplane">
                        发送
                    </UButton>
                </div>
            </div>

            <!-- 右侧：3D 数字人（占 1 列） -->
            <div
                class="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-0 overflow-hidden">
                <!-- TODO: 替换为 ThreeDDigitalPeople 组件 -->
                <div class="flex flex-col items-center gap-4 p-6 text-center">
                    <div class="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                        <UIcon name="i-heroicons-user-circle" class="w-16 h-16 text-primary-400" />
                    </div>
                    <p class="text-sm text-neutral-500">AI 面试官</p>
                    <UBadge color="success" variant="subtle">面试进行中</UBadge>
                </div>
            </div>
        </div>

        <!-- 倒计时遮罩 -->
        <div v-if="showCountdown"
            class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white">
            <div class="text-9xl font-bold mb-12 animate-pulse text-primary-400">
                {{ countdown }}
            </div>
            <div class="text-3xl font-medium tracking-wider text-center px-8">
                面试中请保持网络稳定，如遇网络波动导致面试中断，可刷新页面继续进行面试
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
const showCountdown = ref(false)
const countdown = ref(5)
</script>
