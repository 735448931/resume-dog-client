import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { EmailLoginParams } from '~/api/interface/login'
import { postEmailLoginApi } from '~/api/login'

export const useUserStore = defineStore(
	'user',
	() => {
		const userInfo = ref<Record<string, any>>({})
		const isLogin = ref(false)
		const token = ref('')
		const remember = ref(false)
		const reumes = computed(() => userInfo.value?.resumes || [])

		// 邮箱密码登录
		const handleEmailLogin = async (params: EmailLoginParams) => {
			const data = await postEmailLoginApi(params)
			token.value = data.token
			isLogin.value = true
			updateUserInfo(data.userInfo)
		}

		// 登出
		const logout = () => {
			isLogin.value = false
			token.value = ''
			userInfo.value = {}
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
			reumes,
			remember,
			logout,
			updateUserInfo,
			handleEmailLogin
		}
	},
	{
		persist: true
	}
)
