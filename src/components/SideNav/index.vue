<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
import { ref } from 'vue'
import MenuItem from './MenuItem.vue'

// Constants
const menu = ref<{ label: string, icon: string, hover: boolean}[]>([
  {
    label: 'Today',
    icon: 'mdi-clipboard-outline',
    hover: false,
  },
  {
    label: 'All Events',
    icon: 'mdi-star-four-points',
    hover: false,
  },
  {
    label: 'Contacts ',
    icon: 'mdi-account-circle-outline',
    hover: false,
  },
  {
    label: 'Finances',
    icon: 'mdi-currency-gbp',
    hover: false,
  },
  {
    label: 'Venue Management',
    icon: 'mdi-home',
    hover: false,
  },
])

const footerMenu = ref<{ label: string, icon: string, hover: boolean}[]>([
  {
    label: 'Search',
    icon: 'mdi-magnify',
    hover: false,
  },
  {
    label: 'Today',
    icon: 'mdi-information-slab-circle-outline',
    hover: false,
  },
])

// Data
const openNav = ref<boolean>(false)
</script>

<template>
  <div
    :class="[{'sidenav--open': openNav}]"
    class="sidenav"
  >
    <img
      :src="logo"
      class="sidenav__logo"
    >
    <div class="sidenav__content">
      <div class="sidenav__menu">
        <MenuItem
          v-for="btn in menu"
          :key="btn.label"
          :item="btn"
          :open-nav="openNav"
        />
      </div>
      <div class="sidenav__menu sidenav__menu--footer">
        <MenuItem
          v-for="btn in footerMenu"
          :key="btn.label"
          :item="btn"
          :open-nav="openNav"
        />
      </div>
    </div>
    <button
      class="sidenav__opener"
      @click="openNav = !openNav"
    >
      <i
        :class="[{'mdi-chevron-right': !openNav, 'mdi-chevron-left': openNav}]"
        class="sidenav__opener__icon mdi"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sidenav {
  border-inline-end: .0625rem solid var(--border);
  block-size: 100%;
  padding-inline: .25rem;
  padding-block:  1.5rem;
  inline-size: 3.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease-in-out;

  // Opener
  &__opener {
    position: absolute;
    inset-block-start: 6.25rem;
    inset-inline-end: 0;
    background: var(--shark);
    border-radius: 50%;
    border: .0625rem solid var(--border);
    block-size: 1.5rem;
    inline-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline-end: -0.75rem;

    &__icon {
      color: var(--border);
    }
  }

  // Logo
  &__logo {
    max-block-size: 2.625rem;
  }

  // Content
  &__content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 2;
  }

  // Menu
  &__menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-inline: .5rem;
    margin-block-start: 3.75rem;

    &--footer {
      margin-block-start: 0;
    }
  }

  // Modifiers
  &--open {
    inline-size: 15.625rem;
  }
}
</style>