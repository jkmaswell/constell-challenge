<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
import { ref } from 'vue'
import MenuItem from './MenuItem.vue'
import type { Item } from './types'

// Constants
const menu = ref<Item[]>([
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

const footerMenu = ref<Item[]>([
  {
    id: 'search',
    label: 'Search',
    icon: 'search',
    hover: false,
  },
  {
    id: 'info',
    label: 'Today',
    icon: 'info',
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
    <RouterLink
      class="sidenav__logo"
      to="/home"
    >
      <img
        :src="logo"
      >
    </RouterLink>
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
      <i class="sidenav__opener__icon material-symbols-outlined">
        {{ openNav ? 'chevron_left' : 'chevron_right' }}
      </i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sidenav {
  position: relative;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  border-inline-end: .0625rem solid var(--border);
  inline-size: 3.5rem;
  padding-block:  1.5rem;
  padding-inline: .25rem;
  transition: all 0.3s ease-in-out;

  // Opener
  &__opener {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .0625rem solid var(--border);
    border-radius: 50%;
    background: var(--shark);
    block-size: 1.5rem;
    inline-size: 1.5rem;
    inset-block-start: 6.25rem;
    inset-inline-end: 0;
    margin-inline-end: -0.75rem;

    &__icon {
      color: var(--border);
    }
  }

  // Logo
  &__logo {
    display: flex;
    justify-content: center;
    max-block-size: 2.625rem;
  }

  // Content
  &__content {
    display: flex;
    flex: 2;
    flex-direction: column;
    justify-content: space-between;
  }

  // Menu
  &__menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-block-start: 3.75rem;
    padding-inline: .5rem;

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