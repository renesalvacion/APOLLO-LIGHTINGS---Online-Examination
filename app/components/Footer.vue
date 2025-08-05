<template>
  <v-footer
    app
    :color="theme.global.name.value === 'dark' ? 'darkNav' : 'darkNav'"
    :elevation="4"
    :theme="theme.global.name.value"
  >
    <v-col
      class="text-center py-3"
      cols="12"
       :class="isLight ? 'text-white' : 'text-white'"
    >
      © {{ new Date().getFullYear() }} SpaceX Explorer — Built with Nuxt
    </v-col>
  </v-footer>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

// Theme toggle
const toggleTheme = () => {
  const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('user-theme', newTheme)
}

// Computed for convenience
const isDark = computed(() => theme.global.name.value === 'dark')
const isLight = computed(() => theme.global.name.value === 'light')
</script>