<template>
  <div class="space-bg">
    <!-- Starfield -->
    <div
      v-for="n in 100"
      :key="'star-' + n"
      class="star"
      :style="randomStarStyle()"
    ></div>

    <!-- Shooting stars -->
    <div
      v-for="n in 5"
      :key="'shooting-' + n"
      class="shooting-star"
      :style="randomShootStyle()"
    ></div>
<v-app>
    <!-- App Content (wrapped in v-app!) -->
 <!-- Use your Navbar component -->
<Navbar />


      <v-main>
        <NuxtPage />
      </v-main>

      <Footer/>
    </v-app>
  </div>
</template>


<script setup lang="ts">


useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css'
    }
  ]
})

import { useFavoritesStore } from '~/stores/favorites'
import { useTheme } from 'vuetify'
import { onMounted, watch } from 'vue'


// Load saved theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('user-theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.global.name.value = savedTheme
  }
})

const toggleTheme = () => {
  const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('user-theme', newTheme)
}


const theme = useTheme()
watch(
  () => theme.global.name.value,
  (val) => {
    if (process.client) {
      document.body.classList.toggle('dark', val === 'dark')
    }
  },
  { immediate: true }
)

const favorites = useFavoritesStore()

if (process.client) {
  favorites.loadFromLocalStorage()
}

// Functions for randomly placing stars and shooting stars
function randomStarStyle() {
  const top = Math.random() * 100 + 'vh'
  const left = Math.random() * 100 + 'vw'
  const duration = Math.random() * 10 + 5 + 's'
  return {
    top,
    left,
    animationDuration: duration,
  }
}

function randomShootStyle() {
  const top = Math.random() * 80 + 'vh'
  const left = Math.random() * 100 + 'vw'
  const delay = Math.random() * 10 + 's'
  return {
    top,
    left,
    animationDelay: delay,
  }
}


useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
    }
  ]
})
</script>
