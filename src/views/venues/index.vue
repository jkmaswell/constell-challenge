<script setup lang="ts">
import { useVenuesStore } from '@/views/venues/venues.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Composables
const venuesStore = useVenuesStore()
const router = useRouter()

const { venues } = storeToRefs(venuesStore)

// Methods
const goToDetail = (id: string) => {
  router.push(`/venue/${id}`)
}

// Hooks
onMounted(async () => {
  await venuesStore.getVenues()
})
</script>

<template>
  <div class="home-view">
    <h1>All Venues</h1>
    <div class="home-view__content">
      <label class="home-view__content__label">Venues</label>
      <ItemCard
        v-for="venue in venues"
        :key="venue?.id"
        :item="venue"
        @click="goToDetail(venue?.id)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  // Title
  h1 {
    @media (width <= 64rem) {
      display: none;
    }
  }

  // Content
  &__content {
    &__label {
      text-transform: uppercase;
    }
    
    @media (width <= 64rem) {
      margin-block-start: 3rem;
    }
  }
}
</style>