// 账号登录
export const postTestApi = (body: any) => {
	const { $api } = useNuxtApp()
	return $api<any>('/interview/resume/quiz/stream', {
		method: 'POST',
		body
	})
}
