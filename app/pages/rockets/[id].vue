<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncQuery } from '#imports'
import gql from 'graphql-tag'

const route = useRoute()
const rocketId = route.params.id

const GET_ROCKET = gql`
  query GetRocket($id: ID!) {
    rocket(id: $id) {
      name
      description
      first_flight
      height {
        meters
      }
      diameter {
        meters
      }
      mass {
        kg
      }
      stages
    }
  }
`

const { data, pending, error } = await useAsyncQuery(GET_ROCKET, {
  id: rocketId
})
</script>

<template>
  <div>
    <h1>Rocket Details</h1>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>

    <div v-else>
      <h2>{{ data.rocket.name }}</h2>
      <p><strong>Description:</strong> {{ data.rocket.description }}</p>
      <p><strong>First Flight:</strong> {{ data.rocket.first_flight }}</p>
      <p><strong>Height:</strong> {{ data.rocket.height?.meters }} meters</p>
      <p><strong>Diameter:</strong> {{ data.rocket.diameter?.meters }} meters</p>
      <p><strong>Mass:</strong> {{ data.rocket.mass?.kg }} kg</p>
      <p><strong>Stages:</strong> {{ data.rocket.stages }}</p>
    </div>
  </div>
</template>
