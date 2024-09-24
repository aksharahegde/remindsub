<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
/*
const config = useRuntimeConfig();
useSeoMeta({
  ogImage: `${config.public.baseURL}/og_me.png`,
  twitterCard: "summary_large_image",
});
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/icon.png",
    },
  ],
});
*/
</script>
<style>
:host,
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family: Barlow, "Barlow Fallback: BlinkMacSystemFont",
    "Barlow Fallback: Segoe UI", "Barlow Fallback: Roboto",
    "Barlow Fallback: Helvetica Neue", "Barlow Fallback: Arial", system-ui,
    sans-serif;
  font-feature-settings: normal;
  font-variation-settings: normal;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
}

/* Set the width for both horizontal and vertical scrollbar */
::-webkit-scrollbar {
  width: 3px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: orange;
  border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b36900;
}

/* Clear button for search bar */
::-webkit-search-cancel-button {
  @apply cursor-pointer;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
