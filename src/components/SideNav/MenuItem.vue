<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { onMounted, ref, watch } from 'vue'
import type { MenuItem } from './types'

interface Props {
  item: MenuItem
  openNav: boolean
}

// Props
const props = defineProps<Props>()

// Data
const itemModel = ref<MenuItem>({
  label: '',
  icon: '',
  hover: false,
})

// Watchers
watch(() => props?.item, (nVal: MenuItem) => {
  if (nVal) {
    itemModel.value = nVal
  }
})

//Hooks
onMounted(() => {
  if (!isEmpty(props?.item)) {
    itemModel.value = props?.item
  }
})
</script>

<template>
  <button
    class="menu-item"
    @mouseenter="itemModel.hover = true"
    @mouseleave="itemModel.hover = false"
  >
    <i
      :class="[{'menu-item__icon--filled': itemModel.hover}]"
      class="material-symbols-outlined menu-item__icon"
    >
      {{ itemModel.hover ? 'star_half' : itemModel.icon }}
    </i>
    <span
      :class="[{'menu-item__text--visible': props?.openNav}]"
      class="menu-item__text"
    >
      {{ itemModel.label }}
    </span>
    <div
      v-if="!props?.openNav"
      :class="[{'menu-item__tooltip--visible': itemModel.hover}]"
      class="menu-item__tooltip"
    >
      {{ itemModel.label }}
    </div>
  </button>
</template>

<style lang="scss" scoped>
.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  block-size: 1.5rem;
  font-size: .9375rem;
  inline-size: 100%;
  margin-block: 1rem;
  padding-inline: .5rem;

  &__icon {
    font-size: 1.25rem;
  }

  &__text,
  &__tooltip {
    opacity: 0;
    transition: all 0.3s ease-in-out;
    visibility: hidden;

    &--visible {
      opacity: 1;
      visibility: visible;
    }
  }

  &__text {
    margin-inline-start: 1rem;
    white-space: nowrap;
  }

  &__tooltip {
    position: absolute;
    border: .0625rem solid var(--primary);
    border-radius: 2.5rem;
    background: var(--background);
    font-size: .75rem;
    inset-block-start: 50%;
    inset-inline-start: 100%;
    padding-block: 0.5rem;
    padding-inline: 1rem;
    transform: translateY(-50%);
    white-space: nowrap;
  }
}
</style>