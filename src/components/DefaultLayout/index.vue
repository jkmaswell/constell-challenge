<template>
  <div class="layout">
    <aside class="layout__sidenav">
      <SideNav />
    </aside>
    <main class="layout__main">
      <header class="layout__header">
        <slot name="header" />
      </header>
      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  background: var(--background);
  block-size: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  // Sidenav
  &__sidenav {
    block-size: 100%;
  }

  // Main
  &__main {
    flex: 2;
  }

  // Header
  &__header {
    background: var(--primary);
    block-size: 3.5rem;
  }

  // Content
  &__content {
    overflow: auto;
    padding: 3rem;
  }
}
</style>