<template>
  <div class="fixed bottom-4 right-4">
    <UButton color="black" icon="heroicons:plus" @click="clicked" />
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "clicked"): void;
}>();

const clicked = () => {
  emit("clicked");
};
</script>
