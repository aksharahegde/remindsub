<template>
  <div class="flex items-center justify-between">
    <h1 class="font-bold">{{ title }}</h1>
    <UButton
      color="gray"
      variant="ghost"
      size="sm"
      icon="i-heroicons-x-mark"
      square
      padded
      @click="emit('close')"
    />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>
