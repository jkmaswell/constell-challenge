<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Constants
const menu = ref<{ id: string, label: string, icon: string, hover: boolean}[]>([
  {
    id: 'home',
    label: 'Today',
    icon: 'content_paste',
    hover: false,
  },
  {
    id: 'venue',
    label: 'All Events',
    icon: 'star',
    hover: false,
  },
  {
    id: 'contacts',
    label: 'Contacts ',
    icon: 'account_circle',
    hover: false,
  },
  {
    id: 'finances',
    label: 'Finances',
    icon: 'currency_pound',
    hover: false,
  },
  {
    id: 'venue-management',
    label: 'Venue Management',
    icon: 'home',
    hover: false,
  },
])
</script>

<template>
  <div class="mobile-navbar">
    <button
      v-for="item in menu"
      :key="item?.label"
      :class="[{'mobile-navbar__item--selected': route?.path?.includes(item?.id) }]"
      class="mobile-navbar__item"
    >
      <i class="material-symbols-outlined menu-item__icon">
        {{ route?.path?.includes(item?.id) ? 'star_half' : item?.icon }}
      </i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.mobile-navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--background);
  block-size: 3.625rem;
  border-block-start: .0625rem solid var(--primary);
  box-shadow: inset 0 -2rem 3.25rem -2.4375rem var(--primary);

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &--selected {
      border: .0625rem solid var(--primary);
      border-radius: 50%;
      background: var(--background);
      block-size: 4rem;
      inline-size: 4rem;
      inset-block-start: -1.5rem;
    }
  }
}
</style>