// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          dark: true,
          colors: {
            background: '#121212',
            // inside themes.dark.colors
            white: '#FFFFFF',

            surface: '#1E1E1E',
            primary: '#2196F3',
            secondary: '#03DAC6',
            'on-primary': '#FFFFFF',
            'on-surface': '#FFFFFF',
            'on-background': '#FFFFFF',
          },
        },
        light: {
          dark: false,
          colors: {
            background: '#FFFFFF',
            darkNav: '#1E1E1E', // add this
            surface: '#F5F5F5',
            primary: '#2196F3',
            secondary: '#03DAC6',
            'on-primary': '#000000',
            'on-surface': '#000000',
            'on-background': '#000000',
          },
        },
      },
    },

    // 👉 Add this section to inject Poppins globally
    defaults: {
      global: {
        style: {
          fontFamily: 'Poppins, sans-serif',
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
