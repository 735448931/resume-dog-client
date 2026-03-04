<template>
    <div class="relative">

        <!-- 切换按钮 -->
        <div class=" absolute right-0 translate-x-[50%] top-[50%] translate-y-[-50%] z-30">
             <UButton  icon="i-lucide-chevron-right" variant="solid" @click="toggleSidebar"/>
             <!-- i-lucide-menu -->
        </div>
        
        <aside class="h-full border-r border-slate-200 flex flex-col shrink-0 z-10 transition-[width] duration-300 ease-in-out will-change-[width] overflow-hidden">

        </aside>
    </div>
</template>

<script setup lang="ts">

const toggleSidebar = () => {

}

</script>

<style scoped>

</style>