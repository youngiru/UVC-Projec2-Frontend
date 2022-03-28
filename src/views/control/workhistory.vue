<template>
  <div>
    <app-header />
    <div class="work_box" style="margin: 70px auto 0; width: 1280px">
      <div id="chartbox" style="display: inline-block">
        <canvas
          ref="barChart"
          width="400"
          height="400"
          style="width: 600px !important; height: 600px !important"
          class="barChart"
        ></canvas>
      </div>
      <b-table
        :items="item"
        hover
        :fields="fields"
        style="
          width: 300px;
          display: inline-block;
          margin-left: 150px;
          vertical-align: top;
          margin-top: 100px;
          text-align: center;
        "
      ></b-table>
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/controlheader.vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  components: {
    'app-header': Header
  },
  data: () => ({
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    fields: [
      {
        key: 'name',
        label: '공장'
      },
      {
        key: 'temperature',
        label: '온도계'
      }
    ],
    item: [
      { name: 40, temperature: 'Dickerson' },
      { name: 40, temperature: 'Dickerson' }
    ]
  }),
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      new Chart(this.$refs.barChart, {
        type: 'bar',
        data: this.data,
        options: this.options
      })
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
