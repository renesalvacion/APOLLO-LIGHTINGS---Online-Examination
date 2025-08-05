import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	srcDir: 'app/',
	components: true,
	
	build: { transpile: ['vuetify'] },
	imports: { dirs: ['./stores'] },
	
	css: ['./assets/css/main.css'

	],
	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: { httpEndpoint: 'https://spacex-production.up.railway.app/' },
		},
	},

	vite: {
		optimizeDeps: {
			include: ['graphql-tag'],
		},
		plugins: [vuetify()],
	},

	modules: ['@nuxtjs/apollo', ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]],
	 nitro: {
    compatibilityDate: '2024-11-11'
  }
	


	
})