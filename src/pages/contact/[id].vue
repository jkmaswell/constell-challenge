<script setup lang="ts">
import ContactDetail from '@/views/people/ContactDetail.vue'
</script>

<template>
  <DefaultLayout class="contact">
    <template #header>
      <TopBar
        title="Edit user"
        class="contact__topbar"
        inner
      />
    </template>
    <ContactDetail />
  </DefaultLayout>
</template>