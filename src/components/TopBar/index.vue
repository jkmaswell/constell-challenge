<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title: string
  inner?: boolean
}

// Props
const props = defineProps<Props>()

// Composables
const router = useRouter()

// Methods
const goToPrevious = () => {
  router.back()
}
</script>

<template>
  <div class="topbar">
    <button
      v-if="props?.inner"
      class="topbar__back"
      @click="goToPrevious"
    >
      <i class="topbar__back__icon material-symbols-outlined">
        chevron_left
      </i>
      <span class="topbar__back__text">Back</span>
    </button>
    <h3>{{ props?.title }}</h3>
    <button
      v-if="props?.inner"
      class="topbar__more"
    >
      <i class="topbar__back__icon material-symbols-outlined">
        more_vert
      </i>
      <span class="topbar__back__text">Back</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  block-size: 3.5rem;

  // Title
  h3 {
    color: var(--secondary);
  }

  &__back,
  &__more {
    position: absolute;

    &__icon {
      @media (width <= 37.5rem) {
        font-size: 1.5rem;
      }
    }
  }

  // Back
  &__back {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .875rem;
    inset-block-start: 50%;
    inset-inline-start: 2rem;
    transform: translateY(-50%);
    
    &__icon,
    &__text {
      color: var(--secondary);
    }

    &__text {
      text-decoration: underline;

      @media (width <= 37.5rem) {
        display: none;
      }
    }

    @media (width <= 64rem) {
      font-size: .75rem;
    }

    @media (width <= 37.5rem) {
      inset-inline-start: 1rem;
    }
  }

  // More
  &__more {
    display: none;
    inset-block-start: 50%;
    inset-inline-end: 1rem;
    transform: translateY(-50%);

    @media (width <= 37.5rem) {
      display: block;
    }
  }
}
</style>