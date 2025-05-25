<template>
  <div>
    <bar-chart v-if="type === 'Bar'" :chart-data="data" :options="options" />
    <line-chart v-else :chart-data="data" :options="options" />
    <slot />
    <slot name="reveal-actions" />
    <slot name="actions" />
  </div>
</template>

<script>
import { Bar, Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'BaseMaterialChartCard',
  props: {
    data: { type: Object, required: true },
    options: { type: Object, default: () => ({}) },
    type: { type: String, default: 'Line' }
  },
  components: {
    BarChart: {
      extends: Bar,
      mixins: [reactiveProp],
      props: ['options'],
      mounted () {
        this.renderChart(this.chartData, this.options)
      }
    },
    LineChart: {
      extends: Line,
      mixins: [reactiveProp],
      props: ['options'],
      mounted () {
        this.renderChart(this.chartData, this.options)
      }
    }
  }
}
</script>
