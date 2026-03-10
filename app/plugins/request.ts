import { useUserStore } from '~/stores/user'
import { useToast } from '#imports'
import type { FetchContext, FetchResponse } from 'ofetch'

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig()

	// 创建全局 ofetch 实例（同构：SSR/CSR 都可用）
	const api = $fetch.create({
		baseURL: config.public.apiBase as string,
		timeout: 15_000,
		credentials: 'include',

		// ===== 请求拦截 =====
		onRequest({ options }: FetchContext): void {
			const userStore = useUserStore()

			const headers = new Headers((options.headers as HeadersInit) || {})
			if (userStore.isLogin && userStore.token) {
				headers.set('Authorization', `Bearer ${userStore.token}`)
			}

			options.headers = headers
		},

		// ===== 统一"业务解包" =====
		// 假定后端返回 { code, message, data }，且 code === 200 表示成功
		onResponse({ response }: FetchContext & { response: FetchResponse<unknown> }): void {
			const body = response._data as Record<string, unknown> | null

			if (body && typeof body === 'object' && 'code' in body) {
				if (body.code === 200) {
					response._data = body.data // 页面拿到的就是 data
					return
				}
				// 业务错误：提示 + 抛错
				if (import.meta.client) {
					const toast = useToast()
					if (body.code === 401) {
						toast.add({ title: '登录已过期，请重新登录', color: 'warning' })
						const userStore = useUserStore()
						userStore.logout()
					} else if (body.code === 500) {
						toast.add({ title: (body.message as string) || '请求失败', color: 'error' })
					}
				}
				throw createError({
					statusCode: 400,
					statusMessage: (body.message as string) || '请求失败'
				})
			}
		},

		// ===== HTTP 层错误处理 =====
		async onResponseError({ response }: FetchContext & { response: FetchResponse<unknown> }): Promise<void> {
			const status = response?.status

			if (status === 401) {
				if (import.meta.client) {
					const toast = useToast()
					toast.add({ title: '登录已过期，请重新登录', color: 'warning' })
					const userStore = useUserStore()
					userStore.logout?.()
					navigateTo({ path: '/login', replace: true })
				}
				// 服务端场景直接抛错即可
				throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
			}

			if (import.meta.client) {
				const toast = useToast()
				const errData = response?._data as Record<string, unknown> | null
				toast.add({
					title: (errData?.message as string) || '网络错误',
					color: 'error'
				})
			}
			// 抛给调用方（可在页面/组件里按需捕获）
			const errData = response?._data as Record<string, unknown> | null
			throw createError({
				statusCode: status || 500,
				statusMessage: (errData?.message as string) || 'Network Error'
			})
		}
	})

	// 暴露为全局 $api
	return { provide: { api } }
})
