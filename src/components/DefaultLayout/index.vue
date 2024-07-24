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
    <footer class="layout__footer">
      <MobileNavbar />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  background: var(--background);
  block-size: 100%;

  // Sidenav
  &__sidenav {
    block-size: 100%;

    @media (width <= 37.5rem) {
      display: none;
    }
  }

  // Main
  &__main {
    flex: 2;
  }

  // Content
  &__content {
    overflow: auto;
    block-size: calc(100% - 3.5rem);
    padding-block: 2rem;
    padding-inline: 3rem;

    @media (width <= 37.5rem) {
      padding-block-end: 8rem;
      padding-inline: 1rem;
    }
  }

  // Footer
  &__footer {
    position: fixed;
    z-index: 2;
    display: none;
    inline-size: 100%;
    inset-block-end: 0;
    inset-inline-start: 0;

    @media (width <= 37.5rem) {
      display: block;
    }
  }
}
</style>