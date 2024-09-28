<template>
  <UCard>
    <p class="text-gray-500 pb-4">
      Are you sure you want to delete this subscription?
    </p>
    <div class="flex justify-end space-x-2">
      <UButton @click="cancel" color="black" variant="outline" label="Cancel" />
      <UButton
        @click="confirm"
        color="black"
        variant="solid"
        label="Yes, delete it"
      />
    </div>
  </UCard>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
}>();

const cancel = () => emit("cancel");
const confirm = () => emit("confirm");
</script>
