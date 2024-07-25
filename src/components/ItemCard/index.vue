<script setup lang="ts">
import type { CardItem } from './types'

interface Props {
  item: CardItem
}

// Props
const props = defineProps<Props>()
</script>

<template>
  <div class="item-card">
    <i
      :style="{ background: props?.item?.color}"
      class="item-card__color"
    />
    <span class="item-card__name">
      {{ props?.item?.name }}
    </span>
    <button class="item-card__edit">
      <i class="material-symbols-outlined">border_color</i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.item-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .75rem;
  border-radius: .375rem;
  background: var(--secondary);
  block-size: 5rem;
  cursor: pointer;
  inline-size: 19rem;

  // Color
  &__color {
    border-radius: 50%;
    block-size: 2.75rem;
    inline-size: 2.75rem;

    @media (width <= 64rem) {
      block-size: 2.5rem;
      inline-size: 2.5rem;
    }
  }

  // Name
  &__name {
    flex: 2;
    font-weight: 500;
    margin-inline: .75rem;

    @media (width <= 64rem) {
      font-size: .875rem;
    }

    @media (width <= 37.5rem) {
      font-size: .75rem;
    }
  }

  @media (width <= 64rem) {
    block-size: 4.75rem;
  }

  @media (width <= 37.5rem) {
    block-size: 4.5rem;
    inline-size: 100%;
  }
}
</style>