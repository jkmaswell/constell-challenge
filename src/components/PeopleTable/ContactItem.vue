<script setup lang="ts">
import type { Contact } from '@/views/people/types'
import { useTeamsStore } from '@/views/teams/teams.store'
import type { Team } from '@/views/teams/types'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

interface Props {
  item: Contact
}

interface Emit {
  (e: 'deleteContact', value: string): void
  (e: 'openContact', value: string): void
}

// Props
const props = defineProps<Props>()

// Emits
const emit = defineEmits<Emit>()

// Composables
const teamsStore = useTeamsStore()

const { teams } = storeToRefs(teamsStore)

// Computed
const formattedPhoneNumber = computed(() => {
  return `${props.item?.phoneCountryPrefix} ${props.item?.phoneNumber}`
})

// Methods
const getTeamName = (teamId: string) => {
  return teams.value?.find((t: Team) => t?.id === teamId )?.abbreviation
}

const getTeamColor = (teamId: string) => {
  return teams.value?.find((t: Team) => t?.id === teamId )?.color
}

const copyToClipboard = (data: string | undefined) => {
  if (data)
    navigator.clipboard.writeText(data)
}

const deleteContact = () => {
  emit('deleteContact', props.item.id)
}
</script>

<template>
  <div
    class="contact-item"
    @click="emit('openContact', props?.item?.id)"
  >
    <img
      :src="props?.item.image"
      alt="Contact Image"
      class="contact-item__image"
    >
    <div class="contact-item__info">
      <div class="contact-item__info__row">
        <span class="contact-item__info__username">
          {{ props?.item?.displayName }}
        </span>
        <span class="contact-item__info__role">
          {{ props?.item?.functionName }}
        </span>
      </div>
      <div class="contact-item__info__row">
        <span class="contact-item__info__name">
          {{ props?.item?.fullName }}
        </span>
        <span
          class="contact-item__info__email"
          @click.stop="copyToClipboard(props?.item?.email)"
        >
          {{ props?.item?.email }}
        </span>
        <span
          class="contact-item__info__phone"
          @click.stop="copyToClipboard(formattedPhoneNumber)"
        >
          | {{ formattedPhoneNumber }}
        </span>
      </div>
    </div>
    <span class="contact-item__role">
      {{ props?.item?.functionName }}
    </span>
    <div
      class="contact-item__email"
      @click.stop="copyToClipboard(props?.item?.email)"
    >
      {{ props?.item?.email }}
    </div>
    <div
      class="contact-item__phone"
      @click.stop="copyToClipboard(formattedPhoneNumber)"
    >
      {{ formattedPhoneNumber }}
    </div>
    <div class="contact-item__teams">
      <span
        v-for="teamId in props?.item?.teamIds"
        :key="teamId"
        :style="{ background: getTeamColor(teamId)}"
        class="contact-item__teams__badge"
      >
        {{ getTeamName(teamId) }}
      </span>
    </div>
    <div class="contact-item__actions">
      <button
        class="contact-item__delete"
        @click.stop="deleteContact"
      >
        <i class="material-symbols-outlined contact-item__delete__icon">delete</i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1.3rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  // Image
  &__image {
    flex-shrink: 0;
    border: .0625rem solid var(--primary);
    border-radius: 50%;
    block-size: 2rem;
    inline-size: 2rem;
    margin-inline-end: 0.5rem;
    object-fit: cover;
  }

  // Info
  &__info {
    display: flex;
    flex-direction: column;
    font-size: .875rem;
    gap: .1875rem;
    max-inline-size: 18.75rem;
    min-inline-size: 12.5rem;

    &__row {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: .4rem;

      &:not(:last-child) {
        gap: .75rem;
      }
    }

    &__username {
      font-weight: 500;
    }

    &__name {
      color: var(--text-secondary);
      font-weight: 300;

      @media (width <= 64rem) {
        display: none;
      }
    }

    &__role,
    &__email,
    &__phone {
      display: none;
      color: var(--text-secondary);

      @media (width <= 64rem) {
        display: block;
      }
    }
  }

  // Email
  &__info,
  &__email,
  &__phone,
  &__role {
    font-size: .875rem;
    font-weight: 300;

    @media (width <= 64rem) {
      font-size: .75rem;
    }

    @media (width <= 37.5rem) {
      font-size: .6875rem;
    }
  }

  &__email,
  &__phone,
  &__role {
    flex: 1;

    @media (width <= 64rem) {
      display: none;
    }
  }

  // Teams
  &__teams {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-inline-end: 1rem;

    // Badge
    &__badge {
      display: inline-block;
      flex-shrink: 0;
      border: .0625rem solid var(--primary);
      border-radius: 50%;
      block-size: 1.75rem;
      font-size: .875rem;
      font-weight: 500;
      inline-size: 1.75rem;
      line-height: 1.75rem;
      margin-inline-end: -0.3125rem;
      text-align: center;

      @media (width <= 37.5rem) {
        block-size: 1.5rem;
        font-size: .6875rem;
        inline-size: 1.5rem;
        line-height: 1.375rem;
      }
    }
  }

  // Actions
  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
  }

  // Delete
  &__delete {
    &__icon {
      font-size: 2rem;
    }
  }

  &:hover {
    background: var(--secondary);
  }
}
</style>