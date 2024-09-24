<template>
  <div
    class="flex flex-col space-y-4 justify-center items-center px-4 py-6 bg-white min-h-screen"
  >
    <SharedLogo />
    <h1 class="text-2xl font-bold text-center">
      Manage your subscriptions effortlessly.
    </h1>
    <AuthLogin v-if="!loggedIn" />
    <UButton
      v-else
      label="Dashboard"
      to="/dashboard"
      color="black"
    />
  </div>
</template>
<script setup>
const { loggedIn } = useUserSession();
</script>
