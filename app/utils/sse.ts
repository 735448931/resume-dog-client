interface SSECallbacks {
	onMessage?: (data: any) => void
	onError?: (error: Error) => void
	onComplete?: () => void
}

interface SSEOptions {
	token?: string
	baseURL?: string
	callbacks?: SSECallbacks
}

interface SSEController {
	close: () => void
}

export const ssePost = (
	path: string,
	params: Record<string, any>,
	options?: SSEOptions
): SSEController => {
	if (typeof window === 'undefined') {
		return { close: () => {} }
	}

	const { token, baseURL = '', callbacks = {} } = options || {}
	const { onMessage, onError, onComplete } = callbacks

	const url = `${baseURL}${path.startsWith('/') ? path : `/${path}`}`
	let controller: AbortController | null = null

	const connect = async () => {
		try {
			controller = new AbortController()
			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
				Accept: 'text/event-stream'
			}
			if (token) {
				headers.Authorization = `Bearer ${token}`
			}
			const response = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(params),
				credentials: 'include',
				signal: controller.signal
			})
			if (!response.ok) {
				const errorText = await response.text()
				throw new Error(
					`HTTP ${response.status}: ${errorText || response.statusText}`
				)
			}
			if (!response.body) throw new Error('Response body is null')
			const reader = response.body.getReader()
			const decoder = new TextDecoder()
			let buffer = ''
			while (true) {
				const { done, value } = await reader.read()
				if (done) {
					onComplete?.()
					break
				}
				buffer += decoder.decode(value, { stream: true })
				const lines = buffer.split('\n')
				buffer = lines.pop() || ''
				for (const line of lines) {
					if (line.startsWith('data: ')) {
						const data = line.slice(6).trim()
						if (data === '[DONE]') {
							onComplete?.()
							return
						}
						try {
							const parsed = JSON.parse(data)
							onMessage?.(parsed)
						} catch {
							onMessage?.({ content: data })
						}
					}
				}
			}
		} catch (error) {
			if ((error as Error).name !== 'AbortError') {
				onError?.(error as Error)
			}
		}
	}

	connect()
	return { close: () => controller?.abort() }
}
