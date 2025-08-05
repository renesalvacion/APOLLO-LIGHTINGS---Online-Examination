<script setup lang="ts">
import { useLaunches } from '~/composables/useLaunches'
import LaunchCard from '~/components/LaunchCard.vue'
import { computed, ref, watch } from 'vue'

import { useTheme } from 'vuetify'
const theme = useTheme()


// Destructure composable
const { selectedYear, sortOrder, launches, pending, error } = useLaunches()

// Pagination setup
const currentPage = ref(1)
const itemsPerPage = 6

// Watch for filter/sort changes to reset page
watch([selectedYear, sortOrder], () => {
  currentPage.value = 1
})

// Generate year options dynamically from launches data
const years = computed(() => {
  const uniqueYears = new Set(
    launches.value.map((l: any) =>
      new Date(l.launch_date_utc).getFullYear().toString()
    )
  )
  return Array.from(uniqueYears).sort((a, b) => b - a)
})

const searchQuery = ref('')

// Filtered launches based on search
const filteredLaunches = computed(() => {
  if (!searchQuery.value) return launches.value

  return launches.value.filter((launch: any) => {
    const title = launch.mission_name || ''
    const name = launch.rocket?.rocket_name || ''
    const query = searchQuery.value.toLowerCase()
    return (
      title.toLowerCase().includes(query) ||
      name.toLowerCase().includes(query)
    )
  })
})

// Paginated launches from filtered list
const paginatedLaunches = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredLaunches.value.slice(start, end)
})

// Update total pages based on filtered list
const totalPages = computed(() =>
  Math.ceil(filteredLaunches.value.length / itemsPerPage)
)


</script>


<template>
  <v-container>
  <v-row>
  <v-col cols="12" md="12">
   <v-text-field
  v-model="searchQuery"
  label="Search by Title or Name"
  clearable
  color="white"
  theme="dark"
/>
  </v-col>
</v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-select
  v-model="selectedYear"
  :items="years"
  label="Filter by Year"
  clearable
  color="white"
  theme="white"

/>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
  v-model="sortOrder"
  :items="['desc', 'asc']"
  label="Sort by Date"
 
  theme="black"
/>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="launch in paginatedLaunches"
        :key="launch.id + '-' + launch.rocket?.rocket?.id"
        cols="12"
        md="6"
        lg="4"
      >
        <LaunchCard :launch="launch" />
      </v-col>
    </v-row>

    <v-row justify="center" v-if="totalPages > 1">
<v-pagination
  v-model="currentPage"
  :length="totalPages"
  total-visible="5"
  class="my-4"
  :color="theme.global.name.value === 'dark' ? 'white' : 'black'"
  density="comfortable"
  :theme="theme.global.name.value"
/>

    </v-row>

    <div v-if="pending">Loading launches...</div>
    <div v-if="error">Error loading launches: {{ error.message }}</div>
  </v-container>
</template>

