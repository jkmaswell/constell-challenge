<script setup lang="ts">
import { usePeopleStore } from '@/views/people/people.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Composables
const route = useRoute()
const router = useRouter()
const peopleStore = usePeopleStore()

const params = route.params as { id: string }
const { selectedContact } = storeToRefs(peopleStore)

// Methods
const goBack = () => {
  router.back()
}

const saveChanges = async () => {
  await peopleStore.updateContact(selectedContact.value)
  goBack()
}

// Hooks
onMounted(async () => {
  await peopleStore.getContact(params?.id)
})
</script>

<template>
  <div class="contact-detail">
    <div class="contact-detail__avatar">
      <img
        :src="selectedContact?.image"
        class="contact-detail__avatar__image"
      >
      <button class="contact-detail__avatar__edit">
        <i class="material-symbols-outlined">border_color</i>
      </button>
    </div>
    <div class="contact-detail__form">
      <FormKit
        :actions="false"
        type="form"
        submit-label="Save changes"
      >
        <div class="contact-detail__row">
          <FormKit
            id="name"
            v-model="selectedContact.fullName"
            type="text"
            name="name"
            label="Full name*"
            validation="required"
            validation-visibility="live"
          />
          <FormKit
            id="initials"
            v-model="selectedContact.initials"
            type="text"
            name="initials"
            label="Initials"
            validation="required"
          />
        </div>
        <div class="contact-detail__row">
          <FormKit
            id="displayName"
            v-model="selectedContact.displayName"
            type="text"
            name="displayName"
            label="Display Name"
          />
        </div>
        <div class="contact-detail__row">
          <FormKit
            id="role"
            v-model="selectedContact.role"
            type="text"
            name="role"
            label="Role"
          />
        </div>
        <div class="contact-detail__row contact-detail__row--column-mobile">
          <FormKit
            id="email"
            v-model="selectedContact.email"
            type="email"
            name="email"
            label="Email"
            validation="email"
            validation-visibility="live"
          />
          <FormKit
            id="phoneNumber"
            v-model="selectedContact.phoneNumber"
            type="tel"
            name="phoneNumber"
            label="Phone Number"
            validation="matches:/^[0-9]{1}[0-9]{3}[0-9]{2}[0-9]{2}$/"
          >
            <template #prefix>
              <div class="contact-detail__country">
                {{ selectedContact.phoneCountryPrefix }}
                <i class="material-symbols-outlined">keyboard_arrow_down</i>
              </div>
            </template>
          </FormKit>
        </div>
        <div class="contact-detail__row contact-detail__row--column">
          <FormKit
            id="street"
            v-model="selectedContact.address.addressLineOne"
            type="text"
            name="street"
            label="Street"
          />
          <FormKit
            id="streetTwo"
            v-model="selectedContact.address.addressLineTwo"
            type="text"
            name="streetTwo"
          />
        </div>
        <div class="contact-detail__row">
          <FormKit
            id="city"
            v-model="selectedContact.address.city"
            type="text"
            name="city"
            label="City"
          />
          <FormKit
            id="postcode"
            v-model="selectedContact.address.postalCode"
            type="text"
            name="postcode"
            label="Postal Code"
          />
        </div>
        <div class="contact-detail__row">
          <FormKit
            id="country"
            v-model="selectedContact.address.country"
            type="text"
            name="address"
            label="Country"
          />
        </div>
        <div class="contact-detail__row contact-detail__row--end">
          <div class="contact-detail__button contact-detail__button--cancel">
            <FormKit
              type="button"
              label="Cancel"
              @click="goBack"
            />
          </div>
          <div class="contact-detail__button contact-detail__button--save">
            <FormKit
              type="button"
              label="Save changes"
              @click="saveChanges"
            />
          </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-detail {
  display: flex;
  justify-content: space-between;

  // Avatar
  &__avatar {
    position: relative;
    block-size: 4.5rem;
    inline-size: 4.5rem;
    margin-block: 4rem;
    margin-inline: 3rem 4rem;

    &__image {
      border: .0625rem solid var(--primary);
      border-radius: 50%;
      block-size: 4.5rem;
      inline-size: 4.5rem;
      margin-inline-end: 0.5rem;
      object-fit: cover;
    }

    &__edit {
      position: absolute;
      border: .0625rem solid var(--primary);
      border-radius: 50%;
      background: var(--secondary);
      block-size: 2.5rem;
      inline-size: 2.5rem;
      inset-block-start: 50%;
      inset-inline-start: calc(100% - 1.25rem);

    }

    @media (width <= 64rem) {
      margin-inline: 0 3rem;
    }

    @media (width <= 37.5rem) {
      margin-block: 0;
      margin-inline: auto;
    }
  }

  // Form
  &__form {
    flex: 2;
    padding-block: 4rem;

    .formkit-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    @media (width <= 37.5rem) {
      padding-block: 1.5rem;
    }
  }

  // Row
  &__row {
    display:  flex;
    justify-content: space-between;
    gap: 1rem;

    // Inner Form
    :deep(.formkit-outer) {
      position: relative;
      flex: 1;

      .formkit-label {
        margin: 0;
        font-size: .875rem;
        line-height: 1.8;

        @media (width <= 64rem) {
          font-size: .75rem;
        }
      }

      .formkit-inner {
        display: flex;
        justify-content: space-between;
      }

      .formkit-messages {
        position: absolute;
        padding: 0;
        inset-block-end: -1.5rem;
        inset-inline-start: 0;
        list-style: none;
        margin-block: 0.5rem 0;
        margin-inline: 0;
        
        .formkit-message {
          color: var(--error);
          font-size: .75rem;
        }
      }

      input {
        flex: 2;
        border: .0625rem solid var(--border);
        border-radius: .25rem;
        background: var(--background);
        font-weight: 300;
        inline-size: 100%;
        outline: none;
        padding-block: 1.35rem;
        padding-inline: 1rem;
        transition: background 0.3s ease-in-out;

        &:focus, &:focus-visible {
          background: var(--secondary);
        }

        @media (width <= 64rem) {
          font-size: .875rem;
        }
      }
    }

    &--column {
      flex-direction: column;
    }

    &--column-mobile {
      @media (width <= 37.5rem) {
        flex-direction: column;
        gap: 2rem;
      }
    }

    &--end {
      justify-content: flex-end;
      margin-block-start: 3.5rem;

      :deep(.formkit-outer) {
        flex: none;
      }

      @media (width <= 64rem) {
        position: fixed;
        align-items: center;
        justify-content: space-around;
        background: var(--tertiary);
        block-size: 7.75rem;
        border-block-start: .0625rem solid var(--border);
        inline-size: 100%;
        inset-block-end: 0;
        inset-inline-end: 0;
        padding-inline: 3rem;
      }

      @media (width <= 37.5rem) {
        z-index: 2;
        block-size: 4.5rem;
        padding-inline: 1rem;
      }
    }
  }

  // Button
  &__button {
    :deep(.formkit-input) {
      padding: 1rem;
      border: .0625rem solid var(--border);
      border-radius: 2.5rem;
      font-size: .875rem;
      font-weight: 500;
      inline-size: 11.125rem;

      @media (width <= 64rem) {
        font-size: .75rem;
        inline-size: 100%;
      }

      @media (width <= 37.5rem) {
        padding-block: 0.8rem;
        padding-inline: 1rem;
      }
    }

    &--cancel {
      :deep(.formkit-input) {
        background: var(--secondary);
      }
    }

    &--save {
      :deep(.formkit-input) {
        background: var(--primary);
        color: var(--secondary);
      }
    }

    @media (width <= 64rem) {
      flex: 1;
    }
  }

  // Country
  &__country {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .0625rem solid var(--border);
    border-radius: .25rem;
    background: var(--secondary);
    gap: 0.3rem;
    inline-size: 5rem;
    margin-inline-end: -0.25rem;
    min-block-size: 100%;

    @media (width <= 64rem) {
      font-size: .875rem;
    }
  }

  @media (width <= 37.5rem) {
    flex-direction: column;
  }
}
</style>