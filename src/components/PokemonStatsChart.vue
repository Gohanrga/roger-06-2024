<template>
  <div class="bg-blue-light">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  stats: {
    type: Array<number>,
    required: true,
  },
});

const chartData = ref({
  labels: [
    "HP",
    "Ataque",
    "Defensa",
    "Ataque Especial",
    "Defensa Especial",
    "Velocidad",
  ],
  datasets: [
    {
      label: "Estadisticas",
      backgroundColor: "#f87979",
      data: props.stats,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

watch(props.stats, (newStats) => {
  chartData.value.datasets[0].data = newStats;
});
</script>
