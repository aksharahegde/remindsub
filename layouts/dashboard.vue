<template>
  <UContainer :ui="{ padding: 'p-0' }">
    <DashboardNavbar />
    <NuxtLoadingIndicator />
    <slot />
    <UNotifications />
  </UContainer>
</template>
