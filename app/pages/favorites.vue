<script setup>
import { useFavoritesStore } from '~/stores/favorites'
import { useTheme } from 'vuetify'
const theme = useTheme()


const store = useFavoritesStore()
</script>

<template>
  <div>
    <h1>Favorite Rockets</h1>

    <div v-if="!store || store.rockets.length === 0">
      <em>No favorites yet.</em>
    </div>

    <v-list v-else>
      <v-card
        v-for="rocket in store.rockets"
        :key="rocket.id"
         class="mb-4 ma-3"
        elevation="3"
      >
        <v-list-item >
          <v-list-item-title>{{ rocket.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ rocket.description || 'No description' }}</v-list-item-subtitle>
<v-btn
  variant="flat"
  :style="{
    backgroundColor: theme.global.name.value === 'dark' ? '#ff4d4d' : '#d32f2f',
    color: 'white'
  }"
  density="comfortable"
  @click="store.removeRocket(rocket.id)"
>
  Remove
</v-btn>

        </v-list-item>
      </v-card>
    </v-list>

  <v-btn
  v-if="store && store.rockets.length > 0"
  :class="theme.global.name.value === 'dark' ? 'bg-blue-grey-darken-2 text-white' : 'bg-blue text-white'"
  @click="store.clearFavorites"
>
  Clear All
</v-btn>
  </div>
</template>
