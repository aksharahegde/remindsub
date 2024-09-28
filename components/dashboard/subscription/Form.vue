<template>
  <UCard
    :ui="cardUi"
  >
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
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

const schema = v.object({
  appName: v.pipe(v.string(), v.minLength(3)),
  icon: v.pipe(v.string(), v.minLength(3)),
  plan: v.enum(Plan),
  amount: v.pipe(v.number(), v.toMinValue(10)),
  currency: v.enum(Currency),
  billingPeriod: v.enum(BillingPeriod),
  firstPaymentDate: v.pipe(v.string(), v.minLength(3)),
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
  firstPaymentDate: new Date().toISOString(),
  category: "",
  paymentMethod: PaymentMethod.CARD,
  remarks: "",
  status: Status.ACTIVE,
};

const state = reactive<Schema>({
  ...DEFAULT,
  ...props.instance,
  firstPaymentDate: props.instance?.firstPaymentDate
    ? new Date(props.instance.firstPaymentDate).toISOString()
    : new Date().toISOString(),
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
