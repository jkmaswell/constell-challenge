<script setup lang="ts">
import VenueDetail from '@/views/venues/VenueDetail.vue'
</script>

<template>
  <DefaultLayout class="venue-detail">
    <template #header>
      <TopBar
        title="Venue"
        class="venue-detail__topbar"
        inner
      />
    </template>
    <VenueDetail />
  </DefaultLayout>
</template>

<style lang="scss" scoped>
.venue-detail {
  &__topbar {
    :deep(h3) {
      @media (width > 64rem) {
        display: none;
      }
    }
  }
}
</style>