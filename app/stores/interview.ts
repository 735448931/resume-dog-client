import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useInterviewStore = defineStore(
    'interview',
    () => {
        const isSidebarOpen = ref(false)


        return {
            isSidebarOpen
        }
    },
    {
        persist: true
    }
)
