<template>
    <UModal v-model:open="isOpen" :ui="{ content: 'max-w-[520px]' }" @after-leave="onClose">
        <template #header>
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center">
                    <UIcon name="i-heroicons-arrow-up-tray" class="w-5 h-5 text-primary-600" />
                </div>
                <div>
                    <h3 class="text-base font-semibold text-gray-900">上传简历</h3>
                    <p class="text-xs text-gray-500 mt-0.5">支持 PDF、Word 格式，最大 10MB</p>
                </div>
            </div>
        </template>

        <template #body>
            <div class="space-y-5 px-1">
                <!-- 文件上传 -->
                <UFormField label="简历文件" required :error="errorMsg">
                    <UFileUpload
                        v-model="selectedFile"
                        :accept="ACCEPT"
                        layout="list"
                        icon="i-heroicons-document-text"
                        label="拖拽文件到此处，或点击选择"
                        description="PDF、DOC、DOCX · 最大 10MB"
                        :disabled="isUploading"
                        :highlight="!!errorMsg"
                        :file-image="false"
                        class="w-full min-h-36"
                    />
                </UFormField>

            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3 w-full">
                <UButton variant="ghost" color="neutral" :disabled="isUploading" @click="onClose">
                    取消
                </UButton>
                <UButton
                    color="primary"
                    :disabled="!canSubmit"
                    :loading="isUploading"
                    @click="handleUpload"
                >
                    <UIcon v-if="!isUploading" name="i-heroicons-arrow-up-tray" class="w-4 h-4" />
                    {{ isUploading ? '上传中...' : '确认上传' }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>




<script setup lang="ts">
const isOpen = defineModel<boolean>('open', { default: false })

const selectedFile = ref<File | null>(null)
const isUploading = ref(false)
const errorMsg = ref('')

const ACCEPT = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

watch(selectedFile, (file) => {
    errorMsg.value = ''
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
        errorMsg.value = `文件大小不能超过 ${10}MB`
        nextTick(() => { selectedFile.value = null })
        return
    }
})

function onClose() {
    isOpen.value = false
    selectedFile.value = null
    isUploading.value = false
    errorMsg.value = ''
}

async function handleUpload() {
    if (!selectedFile.value) return
    isUploading.value = true
    errorMsg.value = ''

    try {
        // TODO: 替换为实际上传接口
        await new Promise(resolve => setTimeout(resolve, 1800))
        onClose()
    } catch {
        errorMsg.value = '上传失败，请稍后重试'
        isUploading.value = false
    }
}

const canSubmit = computed(() => !!selectedFile.value && !isUploading.value)
</script>
