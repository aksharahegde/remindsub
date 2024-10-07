<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const url = useRequestURL()

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'icon', href: '/icon.png' },
  ]
})

const title = "Subtrackfyi | Track your subscriptions for free"
const description = "A free and minimal tool to track your subscriptions of any kind"

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${url.origin}/og.png`,
  ogUrl: url.origin,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  twitterImage: `${url.origin}/og.png`,
  ogLocale: 'en_US',
});
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
