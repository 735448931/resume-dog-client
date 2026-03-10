<template>
    <header
        class="w-full sticky top-0 z-50 border-b border-gray-200 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/50"
        :class="scrolled ? 'shadow-sm bg-white/80 backdrop-blur' : ''">

        <div class="container px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <NuxtLink to="/" class="text-xl font-semibold text-neutral-900">面试汪</NuxtLink>
                <span class="hidden sm:inline-block text-xs text-neutral-500 translate-y-px">押题·模拟·行测 三位一体</span>
            </div>

            <nav class="hidden md:flex items-center gap-6 text-sm text-neutral-600">
                <NuxtLink to="/interview/start">开启 AI 服务</NuxtLink>
                <NuxtLink to="/history" >服务记录</NuxtLink>
                <NuxtLink to="/profile?tab=redeem" >兑换服务</NuxtLink>
                <NuxtLink to="/faq" >常见问题</NuxtLink>
                <NuxtLink to="/contact" >联系我们</NuxtLink>
            </nav>

            <div class="flex items-center gap-2">
                <template v-if="!userStore.isLogin">
                    <UButton  variant="ghost" to="/login">登录</UButton>
                </template>
                <template v-else>
                    <UDropdownMenu 
                        :items="userMenuItems"
                        mode="hover">
                    </UDropdownMenu>
                </template>

                <NuxtLink
                    class="text-[12px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700 transition-all font-medium border border-primary-200"
                    target="_blank" rel="noopener noreferrer">
                    <span>免费制作简历（简历汪）</span>
                    <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3.5 h-3.5" />
                </NuxtLink>
            </div>

            <UModal v-model:open="showLogoutModal" title="退出登录">
                <template #body>
                    <text>确认退出登录吗?</text>
                </template>
                <template #footer>
                    <div class="flex  gap-2 ml-auto">
                        <UButton color="neutral" variant="outline"  @click="showLogoutModal = false">取消</UButton>
                        <UButton color="neutral" variant="outline"  @click="userStore.logout()">退出登录</UButton>
                    </div>
                </template>
            </UModal>



        </div>

    </header>
</template>

<script setup lang="ts">

const userStore = useUserStore()
const showLogoutModal = ref(false)


const userMenuItems = [
	[
		{ label: '个人中心', icon: 'i-heroicons-user', to: '/profile' },
		{
			label: '服务记录',
			icon: 'i-heroicons-chart-bar',
			to: '/history'
		}
	],
	[
		{
			label: '退出登录',
			icon: 'i-heroicons-arrow-left-on-rectangle',
			onSelect: () => {
			}
		}
	]
]


// 是否已经滚动
const scrolled = ref(false)





const onScroll = () => {
    scrolled.value = window.scrollY > 8
}
onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})

</script>

<style scoped></style>