<template>
  <div>
    <UButton
      @click="showLoginModal"
      label="Get started"
      color="black"
      trailing
    />
    <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-sm' }">
      <div class="flex flex-col bg-white dark:bg-gray-900 p-4 rounded-lg">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Login</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Login to your account to continue</p>
        <div class="flex flex-col space-y-3 mt-4">
          <a
            v-for="option in loginOptions"
            :key="option.to"
            :href="option.to"
            class="flex items-center space-x-2 rounded-md bg-gray-900 dark:bg-gray-800 text-white px-4 py-2"
          >
            <UIcon :name="option.icon" dynamic />
            <span>{{ option.label }}</span>
          </a>
        </div>
      </div>
    </UModal>
  </div>
</template>
<script setup lang="ts">
const loginOptions = [
  {
    label: "Login with Google",
    icon: "i-simple-icons-google",
    to: "/auth/google",
  },
  {
    label: "Login with GitHub",
    icon: "i-simple-icons-github",
    to: "/auth/github",
  },
];

const isModalOpen = ref(false);
const showLoginModal = () => (isModalOpen.value = true);
</script>
