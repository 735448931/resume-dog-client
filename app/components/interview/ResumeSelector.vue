<template>
    <div class="flex flex-col gap-4">
        <!-- 简历选择区域 -->
        <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
				<slot name="title">
					<h3 class="text-sm font-semibold text-neutral-900">选择已有简历</h3>
				</slot>

                <UButton
                    v-if="userStore.resumes.length <= 5"
                    color="primary"
                    variant="ghost"
                    icon="i-heroicons-plus"
                ></UButton>


            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

const userStore = useUserStore()
</script>

<style scoped>

</style>