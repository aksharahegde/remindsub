<template>
  <UAvatar
    :name="appName"
    :alt="appName"
    :icon="!icon ? 'i-simple-icons-gravatar' : `i-logos-${icon.toLowerCase()}`"
    :ui="{ rounded: 'rounded-md' }"
    size="lg"
  />
</template>
<script setup lang="ts">
defineProps<{
  icon: string;
  appName: string;
}>();
</script>
