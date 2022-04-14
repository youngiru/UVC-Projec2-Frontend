<template>
  <div>
    <app-header />
    <div id="work_wrap">
      <h2 class="workhistroy_title">작업이력</h2>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="작업이력" class="workhistory_box" active>
          <div id="workhistory_div">
            <b-button variant="dark">등록</b-button>
            <div>
              <b-table striped hover :fields="before" :items="workHistoryList">
                <template #cell(ready)="">
                  <b-form-checkbox
                    id="ready_checkbox"
                    name="ready_checkbox"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                  </b-form-checkbox>
                </template>
                <template #cell(btn)="">
                  <b-button size="sm" variant="dark" class="mr-2">시작</b-button>
                  <b-button size="sm" variant="dark" class="mr-2">정지</b-button>
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>
        <b-tab title="완료이력" class="completion_box">
          <div id="completion_div">
            <b-button variant="dark">리셋</b-button>
            <b-table striped hover :fields="end" :items="end_items"></b-table>
          </div>
        </b-tab>
        <b-tab title="통계" class="stats_box">
          <div class="work_div" style="margin: 70px auto 0">
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
        </b-tab>
      </b-tabs>
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
    ],
    before: [
      {
        key: 'targetQuantity',
        label: '목표수량'
      },
      {
        key: 'operator',
        label: '담당작업자'
      },
      {
        key: 'createdAt',
        label: '등록시간'
      },
      {
        key: 'leadtime',
        label: '공정반복시간'
      },
      {
        key: 'inputQuantity',
        label: '투입수량'
      },
      {
        key: 'color',
        label: '색 선별'
      },
      {
        key: 'ready',
        label: '준비상태'
      },
      {
        key: 'btn',
        label: '비고'
      }
    ],
    end: [
      {
        key: 'vailableQuantity',
        label: '재고수량'
      },
      {
        key: 'operator',
        label: '담당작업자'
      },
      {
        key: 'leadtime',
        label: '공정반복시간'
      },
      {
        key: 'color',
        label: '색 선별'
      },
      {
        key: 'inputQuantity',
        label: '투입수량'
      },
      {
        key: 'completion',
        label: '완료수량'
      },
      {
        key: 'start',
        label: '가동시간'
      },
      {
        key: 'end',
        label: '끝시간'
      }
    ],
    before_items: [
      {
        target: true,
        operator: 40,
        createdAt: 'test',
        time: 'Dickerson',
        color: 'Macdonald',
        inputQuantity: '2개'
      }
    ],
    end_items: [
      {
        target: true,
        operator: 40,
        time: 'Dickerson',
        color: 'Macdonald',
        inputQuantity: 'Macdonald',
        completion: 'Macdonald',
        start: 'Macdonald',
        end: 'Macdonald'
      }
    ]
  }),
  computed: {
    workHistoryList() {
      return this.$store.getters.WorkHistoryList
    }
  },
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
