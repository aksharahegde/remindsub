<template>
  <div
    ref="container"
    class="relative h-16 select-none overflow-hidden flex items-center justify-start w-full"
  >
    <div :class="message.class" class="w-full h-full flex items-center">
      <UIcon :name="message.icon" class="w-6 h-6" />
      {{ message.text }}
    </div>
    <div
      ref="target"
      class="flex justify-between items-center z-10 bg-white space-x-2 p-2 absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out"
      :style="{ left, opacity }"
    >
      <DashboardSubscriptionIcon
        :icon="subscription.icon"
        :app-name="subscription.appName"
      />
      <div class="flex flex-col w-7/12">
        <div class="font-semibold">{{ subscription.appName }}</div>
        <div class="flex space-x-2">
          <div class="text-xs text-gray-500 flex items-center space-x-1">
            <UIcon name="i-heroicons-tag" class="w-3 h-3" />
            <span>{{ subscription.category }}</span>
          </div>
          <div class="text-xs text-gray-500 flex items-center space-x-1">
            <UIcon name="i-heroicons-credit-card" class="w-3 h-3" />
            <span>{{ subscription.paymentMethod }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col space-y-1 items-end w-4/12">
        <span class="text-xs text-gray-500">
          {{ BILLING_PERIOD[subscription.billingPeriod] }}
          {{ subscription.plan }}
        </span>
        <div class="flex space-x-2 items-center">
          <span class="font-sm font-semibold">
            {{
              formatCurrency(
                subscription.amount,
                "en-IN",
                subscription.currency
              )
            }}
          </span>
        </div>
      </div>
    </div>
    <ClientOnly>
      <teleport to="body">
        <UModal v-model="showDeleteConfirmation">
          <DashboardSubscriptionConfirmDelete
            @cancel="showDeleteConfirmation = false"
            @confirm="deleteSubscription"
          />
        </UModal>
      </teleport>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { useSwipe } from "@vueuse/core";
import type { UseSwipeDirection } from "@vueuse/core";
import type { Subscription } from "~/types";
import { BILLING_PERIOD } from "~/constants";

const props = defineProps({
  subscription: {
    type: Object as PropType<Subscription>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
}>();
const editSubscription = () => emit("edit");
const deleteSubscription = () => emit("delete");
const target = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const containerWidth = computed(() => container.value?.offsetWidth);
const left = ref("0");
const opacity = ref(1);
const message = ref({
  class: "",
  icon: "",
  text: "",
});

const { lengthX } = useSwipe(target, {
  passive: false,
  onSwipe(e: TouchEvent) {
    if (containerWidth.value) {
      if (lengthX.value < 0) {
        const length = Math.abs(lengthX.value);
        left.value = `${length}px`;
        opacity.value = 1.1 - length / containerWidth.value;
        message.value = {
          class: "text-red-500 justify-start",
          icon: "i-heroicons-chevron-double-right",
          text: "Slide to delete",
        };
      } else if (lengthX.value > 0) {
        const length = Math.abs(lengthX.value);
        left.value = `-${length}px`;
        opacity.value = 1.1 - length / containerWidth.value;
        message.value = {
          class: "text-green-500 justify-end",
          icon: "i-heroicons-chevron-double-left",
          text: "Slide to edit",
        };
      } else {
        resetCard();
      }
    }
  },
  onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
    if (
      lengthX.value < 0 &&
      containerWidth.value &&
      Math.abs(lengthX.value) / containerWidth.value >= 0.5
    ) {
      askForDeleteConfirmation(props.subscription);
      left.value = "100%";
      opacity.value = 0;
    } else if (
      lengthX.value > 0 &&
      containerWidth.value &&
      Math.abs(lengthX.value) / containerWidth.value >= 0.5
    ) {
      editSubscription();
      resetCard();
    }
  },
});

const resetCard = () => {
  left.value = "0";
  opacity.value = 1;
};

const showDeleteConfirmation = ref(false);
const selectedSubscription = ref<Subscription | null>(null);
const askForDeleteConfirmation = (subscription: Subscription) => {
  selectedSubscription.value = subscription;
  showDeleteConfirmation.value = true;
};
</script>
