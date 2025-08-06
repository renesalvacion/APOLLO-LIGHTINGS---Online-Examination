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

<template>
<v-app-bar
  app
  :color="theme.global.name.value === 'dark' ? 'white' : 'darkNav'"
  :elevation="4"
  :theme="theme.global.name.value"
>
    <v-toolbar-title class="ml-4"
    :color="theme.global.name.value === 'dark' ? 'white' : 'white'"
    density="comfortable"
    :theme="theme.global.name.value"
    :class="isLight ? 'text-white' : 'text-white'"
    >🚀 SpaceX Explorer</v-toolbar-title>

    <v-spacer />

    <div class="d-flex align-center justify-center" style="gap: 16px;">
      <!-- Theme toggle icon -->
      <v-btn
        icon
        :color="theme.global.name.value === 'dark' ? 'yellow' : 'white'"
        @click="toggleTheme"
      >
        <v-icon>
          {{ theme.global.name.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>

    <NuxtLink
        to="/launches"
        class="text-decoration-none"
        :class="isLight ? 'text-white' : 'text-white'"
      >
        Launches
      </NuxtLink>
    <NuxtLink
        to="/favorites"
        class="text-decoration-none"
        :class="isLight ? 'text-white' : 'text-white'"
      >Favourites</NuxtLink>
    </div>

    <v-spacer />
  </v-app-bar>

 

</template>
