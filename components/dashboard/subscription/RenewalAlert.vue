<template>
  <div>
    <UAlert
      v-if="upcomingRenewals?.length > 0"
      color="white"
      variant="solid"
      :ui="{ padding: 'p-2 px-3' }"
    >
      <template #description>
        <UButton
          icon="i-heroicons-eye"
          color="black"
          variant="link"
          size="sm"
          class="w-full"
          trailing
          :label="description"
          :ui="{
            padding: 'p-0',
            inline: 'justify-between',
            icon: { size: 'xs' },
          }"
          @click="openSlideover"
        />
      </template>
    </UAlert>
    <USlideover
      v-model="isSlideoverOpen"
      side="bottom"
      :ui="{
        height: 'min-h-[94vh]',
        base: 'pb-8 max-w-sm mx-auto overflow-hidden',
        rounded: 'rounded-t-md',
      }"
    >
      <UCard :ui="cardUi">
        <template #header>
          <SharedModalHeader title="Upcoming Renewals" @close="close" />
        </template>
        <div
          class="divide-y divide-gray-100 shadow-md rounded-md overflow-hidden"
        >
          <div
            v-for="subscription in upcomingRenewals"
            :key="subscription.id"
            class="flex justify-between p-2"
          >
            <div class="flex space-x-2 items-center">
              <DashboardSubscriptionIcon
                :icon="subscription.icon"
                :app-name="subscription.appName"
              />
              <div class="font-semibold">{{ subscription.appName }}</div>
            </div>
            <div class="flex flex-col items-end">
              <div class="text-gray-800 font-semibold">
                {{
                  formatCurrency(
                    subscription.amount,
                    "en-IN",
                    subscription.currency
                  )
                }}
              </div>
              <div class="text-sm text-gray-500">
                {{
                  useDateFormat(subscription.nextRenewalDate, "ddd MMM D, YYYY")
                    .value
                }}
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </USlideover>
  </div>
</template>
<script setup lang="ts">
import type { Subscription } from "~/types";
import { cardUi } from "~/constants/ui";

const props = defineProps<{
  subscriptions: Subscription[];
}>();

const isSlideoverOpen = ref(false);
const openSlideover = () => {
  isSlideoverOpen.value = true;
};

const close = () => {
  isSlideoverOpen.value = false;
};

const description = computed(() => {
  return `${upcomingRenewals.value.length} subscription${
    upcomingRenewals.value.length > 1 ? "s are" : " is"
  } renewing soon.`;
});

const upcomingRenewals = computed(() => {
  return props.subscriptions
    ?.map((subscription) => {
      const today = new Date();
      const nextRenewalDate = new Date(subscription.firstPaymentDate);
      switch (subscription.billingPeriod) {
        case "Weekly":
          nextRenewalDate.setDate(nextRenewalDate.getDate() + 7);
          break;
        case "Monthly":
          nextRenewalDate.setMonth(today.getMonth() + 1);
          break;
        case "Yearly":
          nextRenewalDate.setFullYear(today.getFullYear() + 1);
          nextRenewalDate.setMonth(today.getMonth() + 1);
          break;
      }

      const threeDaysFromToday = new Date(
        today.getTime() + 3 * 24 * 60 * 60 * 1000
      );
      const isRenewingSoon = nextRenewalDate <= threeDaysFromToday;
      return {
        ...subscription,
        isRenewingSoon,
        nextRenewalDate,
      };
    })
    .filter((subscription) => subscription.isRenewingSoon);
});
</script>
