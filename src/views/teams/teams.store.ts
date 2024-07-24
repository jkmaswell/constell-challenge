import axios from '@/plugins/axios'
import { useVenuesStore } from '@/views/venues/venues.store'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Team } from './types'

export const useTeamsStore = defineStore('teams', () => {
  // Composables
  const venuesStore = useVenuesStore()

  // Data
  const teams = ref<Team[]>()
  const selectedVenueTeams = ref<Team[]>()

  // Methods
  // Getters
  const getTeams = async (): Promise<void> => {
    const { data } = await axios.get('/teams')

    teams.value = data
  }

  const getTeamsFromVenue = async (): Promise<void> => {
    await getTeams()

    selectedVenueTeams.value = teams.value?.filter((t: Team) => venuesStore.selectedVenue?.teams.includes(t?.id))
  }

  return {
    // Data
    teams,
    selectedVenueTeams,

    // Methods
    getTeams,
    getTeamsFromVenue,
  }
})
