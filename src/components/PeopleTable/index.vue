<script setup lang="ts">
import type { Contact } from '@/views/people/types'
import ContactItem from './ContactItem.vue'

interface Props {
  contacts: Contact[]
}

interface Emit {
  (e: 'deleteContact', value: string): void
  (e: 'openContact', value: string): void
}

// Props
const props = defineProps<Props>()

// Emits
const emit = defineEmits<Emit>()
</script>

<template>
  <div class="people-table">
    <ContactItem
      v-for="item in props?.contacts"
      :key="item?.id"
      :item="item"
      class="people-table__contact"
      @open-contact="emit('openContact', $event)"
      @delete-contact="emit('deleteContact', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.people-table {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 1rem;

  &__contact:not(:last-child) {
    border-block-end: .0625rem solid var(--border);
  }
}
</style>