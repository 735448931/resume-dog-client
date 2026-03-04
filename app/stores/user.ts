import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { MAX_RESUME_COUNT } from '@/constants'

export const useUserStore = defineStore(
	'user',
	() => {
		const userInfo = ref<Record<string, any>>({})
		const isLogin = ref(false)
		const token = ref('')
		const resumes = ref<any[]>([])

		// 是否可以添加更多简历
		const canAddResume = computed(() => resumes.value.length < MAX_RESUME_COUNT)

		// 登出
		const logout = () => {
			isLogin.value = false
			token.value = ''
			userInfo.value = {}
			resumes.value = []
			// navigateTo('/login')
		}

		// 更新用户信息
		const updateUserInfo = (newUserInfo: Record<string, any>) => {
			userInfo.value = { ...userInfo.value, ...newUserInfo }
		}

		return {
			userInfo,
			isLogin,
			token,
			resumes,
			canAddResume,
			logout,
			updateUserInfo
		}
	},
	{
		persist: true
	}
)
