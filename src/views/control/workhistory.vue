<template>
  <div>
    <app-header />
    <div id="work_wrap">
      <h2 class="workhistroy_title">작업이력</h2>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="작업이력" class="workhistory_box" active>
          <div id="workhistory_div">
            <b-button variant="dark" @click="onClickAddNew">등록</b-button>
            <div>
              <b-table striped hover :fields="before" :items="workHistoryList">
                <template #cell(ready)="">
                  <b-form-checkbox
                    id="ready_checkbox"
                    v-model="ready"
                    name="ready_checkbox"
                    value="accepted"
                    unchecked-value="not_accepted"
                    @click="onReady"
                  >
                  </b-form-checkbox>
                </template>
                <template #cell(btn)="">
                  <b-button size="sm" variant="dark" class="mr-2">시작</b-button>
                  <b-button size="sm" variant="dark" class="mr-2" @click="Done">정지</b-button>
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
    <!-- 모달창 -->
    <Inform />
  </div>
</template>

<script>
import Header from '../../components/layout/controlheader.vue'
import inform from './workHistoryinform.vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  components: {
    'app-header': Header,
    Inform: inform
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
        key: 'id',
        label: '작업번호'
      },
      {
        key: 'userId',
        label: '담당자'
      },
      {
        key: 'inputQuantity',
        label: '투입수량'
      },
      {
        key: 'targetQuantity',
        label: '목표수량'
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
        key: 'ready',
        label: '준비상태'
      },
      {
        key: 'createdAt',
        label: '등록시간'
      },
      {
        key: 'btn',
        label: '비고'
      }
    ],
    end: [
      {
        key: 'userId',
        label: '담당자'
      },
      {
        key: 'inputQuantity',
        label: '투입수량'
      },
      {
        key: 'outputQuantity',
        label: '출력수량'
      },
      {
        key: 'qualityQuantity',
        label: '품질수량'
      },
      {
        key: 'color',
        label: '색 선별'
      },
      {
        key: 'uptime',
        label: '가동시간'
      },
      {
        key: 'leadtime',
        label: '공정반복시간'
      },
      {
        key: 'downtime',
        label: '끝난시간'
      }
    ]
  }),
  computed: {
    workHistoryList() {
      return this.$store.getters.WorkHistoryList
    },
    insertedResult() {
      return this.$store.getters.WorkHistoryInsertedResult
    },
    deletedResult() {
      return this.$store.getters.WorkHistoryDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      console.log('work', value)
      // 등록후 처리
      if (value !== null) {
        if (value.id > 0) {
          // 등록 성공한 경우

          // 메세지 출력
          this.$bvToast.toast('등록 되었습니다', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 리스트 재검색
          this.searchWorkHistoryList()
        } else {
          // 등록 실패한 경우
          this.$bvToast.toast('등록 실패하였습니다', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 리스트 재 검색
          this.searchWorkHistoryList()
        } else {
          // 삭제를 실패한 경우
          this.$bvToast.toast('삭제를 실패하였습니다', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  mounted() {
    this.createChart()
  },
  created() {
    this.searchWorkHistoryList()
  },
  methods: {
    createChart() {
      new Chart(this.$refs.barChart, {
        type: 'bar',
        data: this.data,
        options: this.options
      })
    },
    searchWorkHistoryList() {
      this.$store.dispatch('actWorkHistoryList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 입력모드 설정
      this.$store.dispatch('actWorkHistoryInputMode', 'insert')

      // 상세정보 초기화
      this.$store.dispatch('actWorkHistoryInit')

      // 모달 출력
      this.$bvModal.show('modal-workHistory-inform')
    },
    onReady() {
      this.$store.dispatch('actWorkHistoryReady', { id: this.workHistoryList.id, ready: this.ready })
    },
    Done() {
      this.$store.dispatch('actWorkHistoryDelete', this.workHistoryList[0].id)
      console.log('done', this.workHistoryList[0].id)
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
