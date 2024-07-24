import axios from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Venue } from './types'

export const useVenuesStore = defineStore('venues', () => {
  // Data
  const venues = ref<Venue[]>()
  const selectedVenue = ref<Venue>()

  // Methods
  // Getters
  const getVenues = async (): Promise<void> => {
    const { data } = await axios.get('/venues')

    venues.value = data
  }

  const getVenue = async (id: string): Promise<void> => {
    await getVenues()

    selectedVenue.value = venues.value?.find((v:Venue) => v?.id === id)
  }

  return {
    // Data
    venues,
    selectedVenue,

    // Methods
    getVenues,
    getVenue,
  }
})
