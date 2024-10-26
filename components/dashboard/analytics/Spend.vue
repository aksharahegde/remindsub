<template>
  <div ref="cardRef">
    <VisXYContainer
      :width="width"
      :padding="{ top: 10, bottom: 10, left: 10, right: 10 }"
      :margin="{ bottom: 10, left: 10, top: 10, right: 10 }"
      class="h-36 bg-gray-100 dark:bg-gray-950 rounded"
    >
      <VisLine
        :data="data"
        :x="(d: any) => d.x"
        :y="(d: any) => d.y"
        :color="color"
        curveType="basis"
      />
      <VisAxis type="x" :tickFormat="tickFormat" />
      <VisAxis type="y" />
    </VisXYContainer>
  </div>
</template>
<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis } from "@unovis/vue";
import { useDateFormat } from "@vueuse/core";

const cardRef = ref<HTMLElement | null>(null);
const { width } = useElementSize(cardRef);

type DataRecord = {
  month: Date;
  totalAmount: number;
};

const props = defineProps<{
  spends: DataRecord[];
}>();

const data = computed(() =>
  props.spends.map((spend) => ({
    x: new Date(spend.month),
    y: spend.totalAmount,
  }))
);

const tickFormat = (d: Date) => useDateFormat(d, "MMM YYYY").value;
const colorMode = useColorMode();
const color = computed(() => (colorMode.value === "dark" ? "#fff" : "#000"));
</script>
