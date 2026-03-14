// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@vueuse/nuxt',
		['@nuxt/ui', { fonts: false }]
	],
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		public: {
			apiBase: '/api'
		}
	},
	nitro: {
		devProxy: {
			'/api/': {
				target: 'http://localhost:8888/api',
				changeOrigin: true
			}
		}
	}
})
