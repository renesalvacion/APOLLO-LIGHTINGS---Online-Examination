<template><div class="star-container">
  <div
    v-for="i in 50"
    :key="'star-' + i"
    class="star"
    :style="randomStarStyle()"
  ></div>

  <div
    v-for="i in 3"
    :key="'shooting-star-' + i"
    class="shooting-star"
    :style="randomShootStyle()"
  ></div>
</div>

  <v-app>
    <Navbar />

    <v-main>
      <NuxtPage />
    </v-main>

    <Footer />
  </v-app>
</template>



<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

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
  const top = Math.random() * 20 + 'vh'  // start from higher position
  const left = Math.random() * 100 + 'vw'
  const delay = Math.random() * 5 + 's'
  const duration = 1 + Math.random() * 1 + 's'

  const x = `${Math.random() * 200 - 100}px`  // left or right movement
  const y = `${300 + Math.random() * 300}px`  // downward

  return {
    top,
    left,
    animationDelay: delay,
    animationDuration: duration,
    '--x': x,
    '--y': y,
  } as any
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
