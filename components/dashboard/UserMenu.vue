<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar :src="user?.avatar" />

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #theme="{ item }">
      <SharedColorMode />
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
<script setup lang="ts">
const { user, clear }: any = useUserSession();

const items = [
  [
    {
      label: user.value?.username,
      slot: "account",
      disabled: true,
    },

  ],
  [
    {
      label: "Theme",
      icon: "i-heroicons-cog-8-tooth",
      slot: "theme",
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        clear();
        return navigateTo("/");
      },
    },
  ],
];
</script>
