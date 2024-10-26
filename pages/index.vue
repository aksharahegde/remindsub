<template>
  <div
    class="flex flex-col justify-center px-4 py-6 bg-white dark:bg-gray-900 min-h-screen"
  >
    <div class="flex flex-col space-y-4 justify-center items-center">
      <SharedLogo />
      <h1 class="text-2xl font-bold text-center">
        Track your subscriptions for free.
      </h1>
      <AuthLogin v-if="!loggedIn" />
      <UButton v-else label="Dashboard" to="/dashboard" color="black" />
    </div>
    <div class="flex flex-col space-y-4 justify-center items-center mt-36">
      <h2 class="text-xl font-bold text-center">Its open source!</h2>
      <p class="text-center">
        Subtrakfyi is an open source project. You can find the source code on
        <a
          href="https://github.com/aksharahegde/remindsub"
          target="_blank"
          class="text-blue-500"
          >GitHub</a
        >.
      </p>
    </div>
    <div class="flex justify-center items-center mt-36 space-x-2">
      <span class="text-sm text-gray-500 dark:text-gray-400">Built by</span>
      <a href="https://aksharahegde.xyz" target="_blank" class="underline"
        >Akshara Hegde</a
      >
    </div>
    <div class="flex justify-center items-center mt-2 text-sm space-x-2">
      <span class="text-gray-500 dark:text-gray-400">Hosted on</span>
      <a href="https://nuxthub.com" target="_blank" class="underline"
        >NuxtHub</a
      >
    </div>
  </div>
</template>
<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>
