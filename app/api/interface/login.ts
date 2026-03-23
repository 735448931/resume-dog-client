export interface EmailLoginParams {
	email: string
	password: string
}

// 账号登录响应类型
export interface EmailLoginResult {
	token: string
	userInfo: Record<string, unknown>
}
