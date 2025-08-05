import { useAsyncQuery } from '#imports'
import gql from 'graphql-tag'
import { ref, computed, watchEffect } from 'vue'

const GET_LAUNCHES = gql`
  query {
    launchesPast(limit: 100) {
      id
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket{
          id
          name
          description
        }
      }
      details
    }
  }
`

export function useLaunches() {
  // Filter: Selected year (as a string, e.g. "2020")
  const selectedYear = ref('')

  // Sort order: 'asc' for oldest-first or 'desc' for newest-first
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const { data, pending, error } = useAsyncQuery(GET_LAUNCHES)

  // Optional: log the fetched data so you can inspect it
  watchEffect(() => {
    console.log('GraphQL result:', data.value)
  })

  // Compute launches filtered by selectedYear and then sorted by launch date.
  const filteredAndSortedLaunches = computed(() => {
    // Get the launches from the GraphQL response.
    // (Make sure to adjust this if your result shape is different.)
    const launches = data.value?.launchesPast || []

    // Filter by selected year if set.
    let filtered = launches.filter((launch: any) => {
      if (!selectedYear.value) return true
      return new Date(launch.launch_date_utc).getFullYear().toString() === selectedYear.value
    })

    // Sort the launches by launch_date_utc.
    filtered.sort((a: any, b: any) => {
      const dateA = new Date(a.launch_date_utc).getTime()
      const dateB = new Date(b.launch_date_utc).getTime()
      // If sortOrder is 'asc' then smallest date first; else 'desc' for newest first.
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })

    return filtered
  })

  return {
    selectedYear,
    sortOrder,
    launches: filteredAndSortedLaunches,
    pending,
    error
  }
}
