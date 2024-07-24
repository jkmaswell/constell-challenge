import axios from '@/plugins/axios'
import { useVenuesStore } from '@/views/venues/venues.store'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Contact } from './types'

export const usePeopleStore = defineStore('people', () => {
  // Composables
  const venuesStore = useVenuesStore()

  // Constants
  const INIT_VALUES: Contact = { id: '', address: { id: '' } }

  // Data
  const people = ref<Contact[]>()
  const selectedVenueContacts = ref<Contact[]>()

  const selectedContact = ref<Contact>(INIT_VALUES)

  // Methods
  // Getters
  const getPeople = async (): Promise<void> => {
    const { data } = await axios.get('/contacts')

    people.value = data
  }

  const getPeopleFromVenue = async (): Promise<void> => {
    await getPeople()

    selectedVenueContacts.value = people.value?.filter((c: Contact) => venuesStore.selectedVenue?.contacts?.includes(c?.id))
  }

  const getContact = async (id: string): Promise<void> => {
    await getPeople()

    selectedContact.value = people.value?.find((c: Contact) => c?.id === id) || INIT_VALUES
  }

  // Deleters
  const deletePersonFromVenue = async (id: string): Promise<void> => {
    await axios.delete(`contacts/${id}`)
    await getPeopleFromVenue()
  }

  return {
    // Data
    people,
    selectedVenueContacts,
    selectedContact,

    // Methods
    getPeople,
    getPeopleFromVenue, 
    getContact,
    deletePersonFromVenue,
  }
})
