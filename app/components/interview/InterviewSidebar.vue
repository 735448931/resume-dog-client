<template>
	<aside class="h-full w-85 border-r border-slate-200 flex flex-col shrink-0">
		<!-- 品牌头部 -->
		<div class="px-6 py-6 border-b border-slate-100">
			<div class="flex items-center gap-3">
				<div
					class="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-200 shrink-0">
					<UIcon name="i-heroicons-academic-cap" class="w-6 h-6" />
				</div>
				<div>
					<h1 class="font-bold text-slate-900 text-base leading-tight">
						面试汪
					</h1>
					<p class="text-xs text-slate-500 mt-0.5">全链路 AI 面试服务</p>
				</div>
			</div>
		</div>

		<!-- 主内容区：垂直居中 -->
		<div class="flex-1 flex flex-col px-6 py-8">
			<p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
				极简三步，快速开始
			</p>
			<UStepper orientation="vertical" color="neutral" :items="items" class="w-full" />
		</div>

		<!-- 底部装饰 -->
		<div class="px-6 py-4 border-t border-slate-100">
			<p class="text-xs text-slate-400 text-center">押题 · 模拟 · 行测 三位一体</p>
		</div>
	</aside>
</template>

<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items = ref<StepperItem[]>([
	{
		title: '选择岗位与简历',
		description: '定位目标岗位，导入简历',
		icon: 'i-lucide-house'
	},
	{
		title: '开启专项服务形态',
		description: '根据不同服务形态，模拟真实场景',
		icon: 'i-lucide-truck'
	},
	{
		title: '查看分析报告',
		description: '多维度评估与提升计划'
	}
])
</script>

<style scoped></style>
