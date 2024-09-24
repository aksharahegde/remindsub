<template>
  <div>
    <h1>Subscriptions</h1>
    <div v-for="subscription in subscriptions" :key="subscription.id">
      {{ subscription.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const subscriptions: any = useAsyncData("subscriptions", () =>
  $fetch("/api/subscriptions")
);
</script>
