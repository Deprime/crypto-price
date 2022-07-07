<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useTickerStore } from '@/stores/ticker';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS,  BarElement, CategoryScale, LinearScale } from 'chart.js';

  ChartJS.register( BarElement, CategoryScale, LinearScale);

  // Components
  const { activeTickerChart } = storeToRefs(useTickerStore());

  // Data
  const height = 250;
  const chartData = computed(() => {
    const data = {
      labels: activeTickerChart.value.map(i => ""),
      datasets: [
        {
          data: [...activeTickerChart.value],
          backgroundColor: "#FCD34D",
        }
      ],
    };
    return data;
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }
</script>

<template>
  <div :class="`p-4 bg-white rounded-lg h-[${height}px]`">
    <Bar
      :chart-data="chartData"
      :chart-options="chartOptions"
      :height="height"
    />
  </div>
</template>
