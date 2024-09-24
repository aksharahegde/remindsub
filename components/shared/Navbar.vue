<template>
  <nav class="fixed w-full z-20 top-0 start-0">
    <nav
      class="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2 bg-white shadow-sm"
    >
      <SharedLogo />
      <AuthLogin v-if="!loggedIn" />
      <UButton
        v-else
        label="Dashboard"
        to="/dashboard"
        color="black"
        icon="i-heroicons-computer-desktop"
      />
    </nav>
  </nav>
</template>
<script setup>
const { loggedIn } = useUserSession();
</script>
