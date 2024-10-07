<template>
  <UCard :ui="cardUi">
    <template #header>
      <SharedModalHeader title="Add an app" @close="close" />
    </template>
    <UForm
      class="space-y-4 overflow-y-auto max-h-[80vh] min-h-[80vh] px-4"
      :schema="v.safeParser(schema)"
      :state="state"
      @submit="onSubmit"
    >
      <div class="flex items-end justify-between space-x-2">
        <UFormGroup label="Icon" name="icon" class="w-full">
          <UInput v-model="state.icon" />
        </UFormGroup>
        <UAvatar
          :name="state.appName"
          :icon="
            !state.icon
              ? 'i-simple-icons-gravatar'
              : `i-logos-${state.icon.toLowerCase()}`
          "
          :ui="{ rounded: 'rounded-md' }"
          size="lg"
        />
      </div>
      <UFormGroup label="App Name" name="appName" class="col-span-9">
        <UInput v-model="state.appName" />
      </UFormGroup>
      <UFormGroup label="Plan" name="plan">
        <USelectMenu v-model="state.plan" :options="Object.values(Plan)" />
      </UFormGroup>
      <div class="flex items-end justify-between space-x-2">
        <UFormGroup label="Amount" name="amount">
          <UInput v-model="state.amount" type="number" />
        </UFormGroup>
        <UFormGroup label="Currency" name="currency">
          <USelect
            v-model="state.currency"
            :options="Object.values(Currency)"
          />
        </UFormGroup>
      </div>
      <UFormGroup label="Billing Period" name="billingPeriod">
        <USelect
          v-model="state.billingPeriod"
          :options="Object.values(BillingPeriod)"
        />
      </UFormGroup>
      <UFormGroup label="Payment Method" name="paymentMethod">
        <USelect
          v-model="state.paymentMethod"
          :options="Object.values(PaymentMethod)"
        />
      </UFormGroup>
      <UFormGroup label="First Payment Date" name="firstPaymentDate">
        <VueDatePicker
          v-model="state.firstPaymentDate"
          placeholder="May 01, 2024"
          :enable-time-picker="false"
          :six-weeks="'append'"
          :format="formatDate"
          :dark="colorMode.value === 'dark'"
          auto-apply
        />
      </UFormGroup>
      <UFormGroup label="Category" name="category">
        <UInput v-model="state.category" />
      </UFormGroup>
      <UFormGroup label="Status" name="status">
        <USelect v-model="state.status" :options="Object.values(Status)" />
      </UFormGroup>
      <UFormGroup label="Remarks" name="remarks">
        <UTextarea v-model="state.remarks" />
      </UFormGroup>
      <div class="flex justify-end space-x-2">
        <UButton
          color="gray"
          variant="outline"
          size="sm"
          label="Cancel"
          @click="close"
        />
        <UButton
          color="black"
          label="save"
          type="submit"
          class="w-1/2 justify-center"
          :loading="isSubmitting"
          :disabled="isSubmitting || !v.safeParse(schema, state).success"
        />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "#ui/types";
import { cardUi } from "~/constants/ui";
import {
  BillingPeriod,
  Currency,
  PaymentMethod,
  Plan,
  Status,
  type Subscription,
} from "~/types";

const props = defineProps({
  instance: {
    type: Object as PropType<Subscription>,
    required: false,
  },
});
const emit = defineEmits(["close"]);
const close = (refresh: boolean = false) => emit("close", refresh);
const colorMode = useColorMode();

const schema = v.object({
  appName: v.pipe(v.string(), v.minLength(3)),
  icon: v.pipe(v.string(), v.minLength(3)),
  plan: v.enum(Plan),
  amount: v.pipe(v.number(), v.toMinValue(10)),
  currency: v.enum(Currency),
  billingPeriod: v.enum(BillingPeriod),
  firstPaymentDate: v.date(),
  category: v.pipe(v.string(), v.minLength(3), v.maxLength(20)),
  paymentMethod: v.enum(PaymentMethod),
  remarks: v.string(),
  status: v.enum(Status),
});
type Schema = v.InferOutput<typeof schema>;

const DEFAULT: Schema = {
  appName: "",
  icon: "",
  plan: Plan.BASIC,
  amount: 0,
  currency: Currency.INR,
  billingPeriod: BillingPeriod.MONTHLY,
  firstPaymentDate: new Date(),
  category: "",
  paymentMethod: PaymentMethod.CARD,
  remarks: "",
  status: Status.ACTIVE,
};

const state = reactive<Schema>({
  ...DEFAULT,
  ...props.instance,
  firstPaymentDate: props.instance?.firstPaymentDate
    ? new Date(props.instance.firstPaymentDate)
    : new Date(),
  remarks: props.instance?.remarks || "",
});

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const toast = useToast();
const isSubmitting = ref(false);
const baseUrl = "/api/subscriptions";
const onSubmit = async (e: FormSubmitEvent<Schema>) => {
  isSubmitting.value = true;
  try {
    const data = e.data;
    const url = props.instance ? `${baseUrl}/${props.instance.id}` : baseUrl;
    const subscription = await useRequestFetch()(url, {
      method: props.instance ? "PATCH" : "POST",
      body: {
        ...data,
        firstPaymentDate: new Date(data.firstPaymentDate).toISOString(),
      },
    });
    if (subscription) {
      close(true);
    }
  } catch (error) {
    console.log(error);
    toast.add({
      title: "Error",
      description: "Something went wrong",
      color: "red",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
<style>
.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #000;
  --dp-primary-disabled-color: #111a22;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
.dp__theme_dark {
    --dp-background-color: #171717;
    --dp-text-color: #fff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #494a4b;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>
