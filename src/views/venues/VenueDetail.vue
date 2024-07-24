<script setup lang="ts">
import { usePeopleStore } from '@/views/people/people.store'
import { useTeamsStore } from '@/views/teams/teams.store'
import { useVenuesStore } from '@/views/venues/venues.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Composables
const route = useRoute()
const router = useRouter()
const teamsStore = useTeamsStore()
const venuesStore = useVenuesStore()
const peopleStore = usePeopleStore()

const params = route.params as { id: string }
const { selectedVenue } = storeToRefs(venuesStore)
const { selectedVenueTeams } = storeToRefs(teamsStore)
const { selectedVenueContacts } = storeToRefs(peopleStore)

// Methods
const openContact = (id: string) => {
  router.push(`/contact/${id}`)
}

onMounted(async () => {
  await venuesStore.getVenue(params?.id)
  await teamsStore.getTeamsFromVenue()
  await peopleStore.getPeopleFromVenue()
})
</script>

<template>
  <div class="venue-detail">
    <h1 class="venue-detail__title">
      {{ selectedVenue?.name }}
    </h1>
    <div class="venue-detail__teams">
      <label class="venue-detail__label">Teams</label>
      <div class="venue-detail__teams__items">
        <ItemCard
          v-for="team in selectedVenueTeams"
          :key="team?.id"
          :item="team"
        />
      </div>
    </div>
    <button class="venue-detail__button">
      <i class="material-symbols-outlined venue-detail__button__icon">add</i>
      <span class="venue-detail__button__text">
        New Team
      </span>
    </button>
    <div class="venue-detail__people">
      <label class="venue-detail__label">People</label>
      <PeopleTable
        :contacts="selectedVenueContacts"
        @open-contact="openContact"
        @delete-contact="peopleStore.deletePersonFromVenue"
      />
    </div>
    <button class="venue-detail__button">
      <i class="material-symbols-outlined venue-detail__button__icon">add</i>
      <span class="venue-detail__button__text">
        New User
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.venue-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  &__title,
  &__teams,
  &__people {
    inline-size: 100%;
  }

  // Title
  &__title {
    display: none;

    @media (width > 64rem) {
      display: block;
    }
  }

  &__teams,
  &__people {
    margin-block-end: 2rem;
  }
  
  // Teams
  &__teams {
    margin-block-end: 2rem;

    &__items {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(auto-fit, 19rem);

      @media (width <= 37.5rem) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    @media (width <= 64rem) {
      margin-block-start: 3.75rem;
    }
  }

  // Label
  &__label {
    text-transform: uppercase;
  }

  // Add Button
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    
    &__text {
      font-size: .875rem;
      font-weight: 500;
      text-decoration: underline;

      @media (width <= 64rem) {
        font-size: .75rem;
      }
    }
  }

  // People
  &__people {
    margin-block-start: 4rem;
  }

  @media (width <= 37.5rem) {
    align-items: center;
  }
}
</style>