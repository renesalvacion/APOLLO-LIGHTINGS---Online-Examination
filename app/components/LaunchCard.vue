<template>
  <v-card class="mb-4 d-flex flex-column justify-space-between" height="250px">
    <v-card-title>{{ launch.mission_name }}</v-card-title>

    <v-card-text class="text-truncate-container">
      <div>
        <strong>Date:</strong>
        {{ new Date(launch.launch_date_utc).toLocaleDateString() }}<br />

        <strong>Rocket:</strong> {{ launch.rocket.rocket.name }}<br />

        <strong>Launch Site:</strong>
        <span v-if="launch.launch_site?.site_name_long">
          {{ launch.launch_site.site_name_long }}
        </span>
        <span v-else><em>No launch site info</em></span><br />

        <strong>Details:</strong>
        <span v-if="launch.details">
          {{ showFullDetails ? launch.details : truncatedDetails }}
          <v-btn
            variant="text"
            size="small"
            class="ml-1"
            @click="showFullDetails = !showFullDetails"
          >
            {{ showFullDetails ? 'Show Less' : 'Show More' }}
          </v-btn>
        </span>
        <span v-else><em>No details available</em></span>
      </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between w-100 mt-auto">
      <NuxtLink
        v-if="launch.rocket?.rocket?.id"
        :to="`/rockets/${launch.rocket.rocket.id}`"
      >
        <v-btn color="primary" text>View Rocket Details</v-btn>
      </NuxtLink>

<v-btn
  variant="flat"
  :style="{
    backgroundColor: isFavorite
      ? '#ff4d4d'
      : theme.global.current.value.colors.primary,
    color: 'white'
  }"
  @click="toggleFavorite"
>
  {{ isFavorite ? 'Favorited' : 'Add to Favorites' }}
</v-btn>


    </v-card-actions>
  </v-card>
</template>


<script setup lang="ts">
// inside app.vue <script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
    },
  ],
})


import { computed } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'
import { useTheme } from 'vuetify'
const theme = useTheme()



const showFullDetails = ref(false)

const truncatedDetails = computed(() => {
  const text = props.launch.details || ''
  return text.length > 100 ? text.slice(0, 100) + '...' : text
})

const props = defineProps({ launch: Object })
const store = useFavoritesStore()

// ✅ Use launch.id for unique tracking
const launchId = computed(() => props.launch?.id)

const isFavorite = computed(() =>
  store.rockets.some(r => r.id === launchId.value)
)

function toggleFavorite() {
  if (!launchId.value) return

  if (isFavorite.value) {
    store.removeRocket(launchId.value)
  } else {
    store.addRocket({
      id: launchId.value,
      name: props.launch.mission_name,
      description: props.launch.details || 'No description'
    })
  }
}
</script>
