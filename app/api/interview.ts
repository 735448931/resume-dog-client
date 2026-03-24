import { ssePost } from "~/utils/sse"

export const postTestApi = (body: any) => {
	const { $api } = useNuxtApp()
	return $api<any>('/interview/resume/quiz/stream', {
		method: 'POST',
		body
	})
}

// 回答面试问题
export const answerInterviewQuestionAPI = (params:any, options:any) => {
	return ssePost('/interview/mock/answer', params, options)
}