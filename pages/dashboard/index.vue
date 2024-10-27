<template>
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-50px)] w-full px-4 py-2"
  >
    <DashboardSubscriptionButtonAdd @clicked="clicked" />
    <div class="flex flex-col gap-4">
      <ClientOnly>
        <USkeleton v-if="!spend" class="h-36" />
        <DashboardAnalyticsSpend v-else :spends="spend" />
      </ClientOnly>
      <UAlert
        icon="i-heroicons-chart-bar"
        description="Detailed analytics coming soon"
        :ui="{ padding: 'px-4 py-2' }"
      />
    </div>
    <DashboardSubscriptionRenewalAlert :subscriptions="subscriptions" />
    <p class="text-sm text-gray-500 dark:text-gray-400 py-1 my-1 text-right">
      {{ subscriptions?.length }} subscriptions
    </p>
    <div
      class="divide-y divide-gray-100 dark:divide-gray-800 shadow-md rounded-md overflow-hidden"
    >
      <div v-for="subscription in subscriptions" :key="subscription.id">
        <DashboardSubscriptionCard
          :subscription="subscription"
          @edit="editSubscription(subscription)"
        />
      </div>
    </div>
    <USlideover
      v-model="isSlideoverOpen"
      side="bottom"
      :ui="{
        height: 'min-h-[94vh]',
        base: 'pb-8 pt-4 max-w-sm mx-auto overflow-hidden',
        rounded: 'rounded-t-md',
      }"
    >
      <DashboardSubscriptionForm
        :instance="underEdit"
        @close="slideoverClosed"
      />
    </USlideover>
  </div>
</template>
<script setup lang="ts">
import type { Subscription } from "~/types";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const { data: subscriptions, refresh }: any = useAsyncData(
  "subscriptions",
  () => useRequestFetch()("/api/subscriptions")
);

const { data: spend, refresh: refreshSpend }: any = useAsyncData("spend", () =>
  useRequestFetch()("/api/analytics", { params: { period: "Monthly" } as any })
);

const isSlideoverOpen = ref(false);
const clicked = () => (isSlideoverOpen.value = true);

const slideoverClosed = (refetch: boolean = false) => {
  isSlideoverOpen.value = false;
  underEdit.value = undefined;
  if (refetch) {
    refresh();
  }
};

const underEdit = ref<Subscription | undefined>(undefined);
const editSubscription = (subscription: Subscription) => {
  underEdit.value = subscription;
  isSlideoverOpen.value = true;
};
</script>
