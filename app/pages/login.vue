<template>
	<div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
		<div class="w-full max-w-md">

			<!-- Logo -->
			<div class="text-center mb-8">
				<NuxtLink to="/" class="inline-flex flex-col items-center gap-2">
					<div class="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center shadow-md">
						<UIcon name="i-heroicons-academic-cap" class="w-7 h-7 text-white" />
					</div>
					<span class="text-2xl font-bold text-gray-900">面试汪</span>
				</NuxtLink>
				<p class="text-sm text-gray-500 mt-1">押题 · 模拟 · 行测 三位一体</p>
			</div>

			<!-- Card -->
			<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

				<!-- Tabs -->
				<div class="flex border-b border-gray-100">
					<button v-for="tab in tabs" :key="tab.key"
						class="flex-1 py-4 text-sm font-medium transition-all relative" :class="activeTab === tab.key
							? 'text-primary-600'
							: 'text-gray-500 hover:text-gray-700'" @click="switchTab(tab.key)">
						{{ tab.label }}
						<span v-if="activeTab === tab.key"
							class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t" />
					</button>
				</div>

				<div class="p-8">

					<!-- WeChat QR Code View -->
					<template v-if="showWechat">
						<div class="flex flex-col items-center py-2">
							<div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
								<svg class="w-7 h-7 text-green-500" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-7.572 5.168-7.572h.066c-.026-3.905-3.833-7.06-8.045-7.06zm-2.458 3.953c.516 0 .936.418.936.937 0 .518-.42.937-.936.937s-.936-.42-.936-.937c0-.519.42-.937.936-.937zm4.917 0c.517 0 .936.418.936.937 0 .518-.42.937-.936.937s-.936-.42-.936-.937c0-.519.419-.937.936-.937zM24 14.548c0-3.31-3.3-5.999-7.367-5.999-4.065 0-7.367 2.69-7.367 5.999 0 3.31 3.302 5.999 7.367 5.999.951 0 1.874-.132 2.724-.377a.717.717 0 0 1 .608.081l1.567.916a.277.277 0 0 0 .14.047.247.247 0 0 0 .245-.248c0-.059-.023-.12-.04-.181l-.33-1.248a.502.502 0 0 1 .178-.564C23.082 18.016 24 16.375 24 14.548zm-9.773-1.04a.794.794 0 0 1-.795-.794.794.794 0 0 1 1.59 0 .794.794 0 0 1-.795.794zm4.168 0a.794.794 0 0 1-.795-.794.794.794 0 0 1 1.59 0 .794.794 0 0 1-.795.794z" />
								</svg>
							</div>
							<h3 class="text-base font-semibold text-gray-800 mb-1">微信扫码登录</h3>
							<p class="text-xs text-gray-400 mb-6">打开微信 → 扫一扫 → 扫描下方二维码</p>

							<!-- Mock QR Code -->
							<div class="relative p-3 border-2 border-gray-200 rounded-xl bg-white shadow-inner">
								<div class="w-44 h-44 grid grid-cols-10 gap-px p-1">
									<template v-for="(cell, i) in qrPattern" :key="i">
										<div class="rounded-sm" :class="cell ? 'bg-gray-900' : 'bg-white'" />
									</template>
								</div>
								<!-- QR Code corner markers -->
								<div class="absolute top-4 left-4 w-8 h-8 border-4 border-gray-900 rounded-sm" />
								<div class="absolute top-4 right-4 w-8 h-8 border-4 border-gray-900 rounded-sm" />
								<div class="absolute bottom-4 left-4 w-8 h-8 border-4 border-gray-900 rounded-sm" />

								<!-- Scan overlay animation -->
								<div class="absolute inset-3 overflow-hidden rounded">
									<div
										class="w-full h-0.5 bg-green-400/70 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)] animate-scan" />
								</div>
							</div>

							<div class="flex items-center gap-1.5 mt-4 text-xs text-green-600">
								<span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
								等待扫码中…
							</div>
							<p class="text-xs text-gray-400 mt-1">二维码有效期 5 分钟</p>

							<button
								class="mt-6 text-sm text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-1"
								@click="showWechat = false">
								<UIcon name="i-heroicons-arrow-left" class="w-3.5 h-3.5" />
								返回账号登录
							</button>
						</div>
					</template>

					<!-- Form View -->
					<template v-else>

						<!-- Login Form -->
						<UForm v-if="activeTab === 'login'" :state="loginForm" class="space-y-4" @submit="handleLogin">
							<UFormField label="邮箱" name="email">
								<UInput v-model="loginForm.email" type="email" placeholder="请输入邮箱"
									icon="i-heroicons-envelope" size="lg" class="w-full" />
							</UFormField>

							<UFormField label="密码" name="password">
								<UInput v-model="loginForm.password" :type="showLoginPassword ? 'text' : 'password'"
									placeholder="请输入密码" icon="i-heroicons-lock-closed" size="lg" class="w-full"
									:trailing-icon="showLoginPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
									@click-trailing="showLoginPassword = !showLoginPassword" />
							</UFormField>

							<div class="flex items-center justify-between text-sm">
								<label class="flex items-center gap-2 cursor-pointer select-none">
									<input v-model="userStore.remember" type="checkbox"
										class="rounded text-primary-600" />
									<span class="text-gray-600">记住我</span>
								</label>
								<button type="button" class="text-primary-600 hover:text-primary-700 transition-colors">
									忘记密码？
								</button>
							</div>

							<UButton type="submit" color="primary" size="lg" block :loading="loading"
								class="mt-2 justify-center">
								登录
							</UButton>
						</UForm>

						<!-- Register Form -->
						<UForm v-else :state="registerState" class="space-y-4" @submit="handleRegister">
							<UFormField label="邮箱" name="email">
								<UInput v-model="registerState.email" type="email" placeholder="请输入邮箱"
									icon="i-heroicons-envelope" size="lg" class="w-full" />
							</UFormField>

							<UFormField label="密码" name="password">
								<UInput v-model="registerState.password" :type="showRegPassword ? 'text' : 'password'"
									placeholder="至少 8 位，包含字母和数字" icon="i-heroicons-lock-closed" size="lg" class="w-full"
									:trailing-icon="showRegPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
									@click-trailing="showRegPassword = !showRegPassword" />
								<!-- Password strength indicator -->
								<div v-if="registerState.password" class="flex gap-1 mt-1.5">
									<div v-for="n in 4" :key="n" class="h-1 flex-1 rounded-full transition-colors"
										:class="n <= passwordStrength ? strengthColor : 'bg-gray-100'" />
								</div>
								<p v-if="registerState.password" class="text-xs mt-1" :class="strengthTextColor">
									{{ strengthLabel }}
								</p>
							</UFormField>

							<UFormField label="确认密码" name="confirmPassword">
								<UInput v-model="registerState.confirmPassword"
									:type="showConfirmPassword ? 'text' : 'password'" placeholder="再次输入密码"
									icon="i-heroicons-lock-closed" size="lg" class="w-full"
									:trailing-icon="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
									@click-trailing="showConfirmPassword = !showConfirmPassword" />
								<p v-if="registerState.confirmPassword && registerState.password !== registerState.confirmPassword"
									class="text-xs text-red-500 mt-1">
									两次密码输入不一致
								</p>
							</UFormField>

							<UButton type="submit" color="primary" size="lg" block :loading="loading"
								class="mt-2 justify-center">
								注册
							</UButton>
						</UForm>

						<!-- Divider -->
						<div class="relative my-6">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t border-gray-100" />
							</div>
							<div class="relative flex justify-center">
								<span class="bg-white px-3 text-xs text-gray-400">或</span>
							</div>
						</div>

						<!-- WeChat Button -->
						<button
							class="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-sm text-gray-600 hover:text-green-700 font-medium"
							@click="showWechat = true">
							<svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-7.572 5.168-7.572h.066c-.026-3.905-3.833-7.06-8.045-7.06zm-2.458 3.953c.516 0 .936.418.936.937 0 .518-.42.937-.936.937s-.936-.42-.936-.937c0-.519.42-.937.936-.937zm4.917 0c.517 0 .936.418.936.937 0 .518-.42.937-.936.937s-.936-.42-.936-.937c0-.519.419-.937.936-.937zM24 14.548c0-3.31-3.3-5.999-7.367-5.999-4.065 0-7.367 2.69-7.367 5.999 0 3.31 3.302 5.999 7.367 5.999.951 0 1.874-.132 2.724-.377a.717.717 0 0 1 .608.081l1.567.916a.277.277 0 0 0 .14.047.247.247 0 0 0 .245-.248c0-.059-.023-.12-.04-.181l-.33-1.248a.502.502 0 0 1 .178-.564C23.082 18.016 24 16.375 24 14.548zm-9.773-1.04a.794.794 0 0 1-.795-.794.794.794 0 0 1 1.59 0 .794.794 0 0 1-.795.794zm4.168 0a.794.794 0 0 1-.795-.794.794.794 0 0 1 1.59 0 .794.794 0 0 1-.795.794z" />
							</svg>
							微信扫码登录
						</button>

					</template>
				</div>
			</div>

			<p class="text-center text-xs text-gray-400 mt-6">
				登录即表示同意
				<a href="#" class="text-primary-600 hover:underline">服务条款</a>
				和
				<a href="#" class="text-primary-600 hover:underline">隐私政策</a>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { postRegisterApi } from '~/api/login'

definePageMeta({ layout: false })

const toast = useToast()
const userStore = useUserStore()
// --- Tabs ---
const tabs = [
	{ key: 'login', label: '登录' },
	{ key: 'register', label: '注册' }
] as const
type TabKey = typeof tabs[number]['key']

const activeTab = ref<TabKey>('login')
const showWechat = ref(false)
const loading = ref(false)

function switchTab(key: TabKey) {
	activeTab.value = key
	showWechat.value = false
}

// --- Login ---
const loginForm = reactive({
	email: '',
	password: ''
})
const showLoginPassword = ref(false)

async function handleLogin() {
	if (!loginForm.email || !loginForm.password) {
		return toast.add({ title: '请填写邮箱和密码', color: 'warning' })
	}
	loading.value = true
	try {
		await userStore.handleEmailLogin(loginForm)
		toast.add({ title: '登录成功', description: `欢迎回来，${loginForm.email}`, color: 'success' })
		navigateTo('/')
	} catch (e) {
		console.error('[handleLogin error]', e)
	} finally {
		loading.value = false
	}
}

// --- Register ---
const registerState = reactive({
	email: '',
	password: '',
	confirmPassword: ''
})
const showRegPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordStrength = computed(() => {
	const p = registerState.password
	if (!p) return 0
	let score = 0
	if (p.length >= 8) score++
	if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++
	if (/\d/.test(p)) score++
	if (/[^a-zA-Z0-9]/.test(p)) score++
	return score
})

const strengthColor = computed(() => {
	if (passwordStrength.value <= 1) return 'bg-red-400'
	if (passwordStrength.value === 2) return 'bg-yellow-400'
	if (passwordStrength.value === 3) return 'bg-blue-400'
	return 'bg-green-500'
})

const strengthTextColor = computed(() => {
	if (passwordStrength.value <= 1) return 'text-red-500'
	if (passwordStrength.value === 2) return 'text-yellow-600'
	if (passwordStrength.value === 3) return 'text-blue-600'
	return 'text-green-600'
})

const strengthLabel = computed(() => {
	const labels = ['', '弱', '一般', '较强', '强']
	return labels[passwordStrength.value] ?? ''
})

async function handleRegister() {
	if (!registerState.email || !registerState.password) {
		toast.add({ title: '请填写邮箱和密码', color: 'warning' })
		return
	}
	if (registerState.password !== registerState.confirmPassword) {
		toast.add({ title: '两次密码输入不一致', color: 'error' })
		return
	}
	loading.value = true

	const data = await postRegisterApi({
		username: registerState.email,
		email: registerState.email,
		password: registerState.password
	})



	loading.value = false
	toast.add({ title: '注册成功', description: '账号已创建，请登录', color: 'success' })
	switchTab('login')
}

// --- Mock QR pattern (10x10 grid) ---
const qrPattern = [
	1, 1, 0, 1, 0, 1, 0, 1, 1, 0,
	1, 0, 1, 0, 1, 0, 1, 0, 0, 1,
	0, 1, 1, 0, 0, 1, 1, 0, 1, 0,
	1, 0, 0, 1, 1, 0, 0, 1, 0, 1,
	0, 1, 0, 0, 1, 1, 0, 0, 1, 1,
	1, 1, 1, 0, 0, 0, 1, 1, 0, 0,
	0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
	1, 0, 0, 0, 1, 1, 1, 0, 0, 1,
	0, 1, 1, 0, 1, 0, 0, 1, 0, 1,
	1, 0, 1, 1, 0, 1, 1, 0, 1, 0,
]
</script>

<style scoped>
@keyframes scan {
	0% {
		transform: translateY(0);
	}

	100% {
		transform: translateY(176px);
	}
}

.animate-scan {
	animation: scan 2s linear infinite;
}
</style>
