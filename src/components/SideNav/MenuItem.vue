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
      :class="itemModel.hover ? 'mdi-star-four-points-outline' : itemModel.icon"
      class="mdi menu-item__icon"
    />
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  block-size: 1.5rem;
  margin-block: 1rem;
  font-size: .9375rem;
  inline-size: 100%;
  padding-inline: .5rem;
  position: relative;

  &__icon {
    font-size: 1rem;
  }

  &__text,
  &__tooltip {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;

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
    inset-block-start: 50%;
    inset-inline-start: 100%;
    white-space: nowrap;
    transform: translateY(-50%);
    background: var(--background);
    border-radius: 2.5rem;
    border: .0625rem solid var(--primary);
    padding-inline: 1rem;
    padding-block: 0.5rem;
    font-size: .75rem;
  }
}
</style>