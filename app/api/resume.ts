export const postResumeApi = (body: any) => {
	const { $api } = useNuxtApp()
	return $api<any>('/user/resume', {
		method: 'POST',
		body
	})
}
