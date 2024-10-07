<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly>
    <div
      class="flex items-center gap-2 w-full justify-between"
      @click="isDark = !isDark"
    >
      <span>{{ isDark ? "Dark" : "Light" }}</span>
      <UIcon
        :name="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </div>
  </ClientOnly>
</template>
