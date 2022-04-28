<template>
  <div>
    <app-header />
    <div id="work_wrap">
      <h2 class="workhistroy_title">작업이력</h2>
      <b-tabs content-class="mt-3" fill style="display: block">
        <b-tab title="작업현황" class="workhistory_box" active>
          <div id="workhistory_div">
            <b-button variant="dark" @click="onClickAddNew">등록</b-button>
            <div>
              <b-table striped :fields="before" :items="workHistoryList">
                <template #cell(btn)="">
                  <b-button size="sm" variant="dark" class="mr-2" @click="uptimeBtn">시작</b-button>
                  <b-button size="sm" variant="dark" class="mr-2" @click="Done">완료</b-button>
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>
        <b-tab title="작업이력" class="completion_box">
          <div id="completion_div">
            <b-button variant="dark">리셋</b-button>
            <b-table striped :fields="end" :items="workHistoryDoneList"></b-table>
          </div>
        </b-tab>
        <b-tab title="통계" class="status_box">
          <div v-if="chartData" id="chartbox" class="line">
            <line-chart class="chart1" :chart-data="chartData" />
            <line-chart class="chart2" :chart-data="chartData1" />
          </div>
          <b-table :items="item" :fields="fields" class="status_table">
            <template #cell(temperature)="">
              <link href="192.168.43.208:1880/ui" />
            </template>
          </b-table>
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
import LineChart from '@/components/chart/lineChart'

export default {
  components: {
    'app-header': Header,
    Inform: inform,
    'line-chart': LineChart
  },
  data() {
    return {
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
        { name: 40, temperature: '' },
        { name: 40, temperature: '' }
      ],
      before: [
        {
          key: 'id',
          label: '작업번호'
        },
        {
          key: 'userName',
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
          key: 'id',
          label: '작업번호'
        },
        {
          key: 'userName',
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
          key: 'updatedAt',
          label: '끝난시간'
        }
      ],

      chartData: null,
      chartData1: null
    }
  },
  computed: {
    workHistoryList() {
      return this.$store.getters.WorkHistoryList
    },
    workHistoryDoneList() {
      return this.$store.getters.WorkHistoryDoneList
    },
    insertedResult() {
      return this.$store.getters.WorkHistoryInsertedResult
    },
    updatedResult() {
      return this.$store.getters.WorkHistoryUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.WorkHistoryDeletedResult
    },
    uptimeBtn() {
      return this.$store.getters.createdAt
    }
    // downtimeTest() {
    //   return this.$store.getters.updatedAt
    // }
  },
  watch: {
    // uptimeBtn() {
    //   this.$store.getters.createdAt
    // },
    insertedResult(value) {
      // 등록후 처리
      if (value !== null) {
        // 등록 성공한 경우

        // 메세지 출력
        this.$bvToast.toast('등록 되었습니다', {
          title: 'SUCCESS',
          variant: 'warning',
          solid: true
        })

        // 리스트 재검색
        this.searchWorkHistoryList()
      } else {
        // 등록 실패한 경우
        this.$bvToast.toast('등록 실패하였습니다', {
          title: 'ERROR',
          variant: 'dark',
          solid: true
        })
      }
    },
    updatedResult(value) {
      // 등록후 처리
      if (value !== null) {
        // 등록 성공한 경우

        // 메세지 출력
        this.$bvToast.toast('완료 되었습니다', {
          title: 'SUCCESS',
          variant: 'warning',
          solid: true
        })

        // 리스트 재검색
        this.searchWorkHistoryList()
        this.searchWorkHistoryDoneList()
      } else {
        // 등록 실패한 경우
        this.$bvToast.toast('완료를 실패하였습니다', {
          title: 'ERROR',
          variant: 'dark',
          solid: true
        })
      }
    }
    // deletedResult(value) {
    //   // 삭제 후 처리
    //   if (value !== null) {
    //     if (value > 0) {
    //       // 삭제가 성공한 경우

    //       // 메세지 출력
    //       this.$bvToast.toast('삭제 되었습니다.', {
    //         title: 'SUCCESS',
    //         variant: 'warning',
    //         solid: true
    //       })

    //       // 리스트 재 검색
    //       this.searchWorkHistoryList()
    //     } else {
    //       // 삭제를 실패한 경우
    //       this.$bvToast.toast('삭제를 실패하였습니다', {
    //         title: 'ERROR',
    //         variant: 'dark',
    //         solid: true
    //       })
    //     }
    //   }
    // }
  },
  mounted() {
    this.makeChartData()
    this.makeChartData1()
  },
  created() {
    this.searchWorkHistoryList()
    this.searchWorkHistoryDoneList()
  },
  methods: {
    searchWorkHistoryList() {
      this.$store.dispatch('actWorkHistoryList', this.search)
    },
    searchWorkHistoryDoneList() {
      this.$store.dispatch('actWorkHistoryDoneList', this.search)
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
    Done() {
      this.$store.getters.updatedAt
      this.$store.dispatch('actWorkHistoryUpdate', this.workHistoryList[0].id)
      console.log('Done', this.workHistoryList[0].id)
    },
    makeChartData() {
      this.chartData = {
        labels: ['1sec', '2sec', '3sec', '4sec', '5sec'],
        datasets: [
          {
            label: '장비1',
            data: [200, 300, 130, 150, 110],
            backgroundColor: '#F7A4A47f',
            borderColor: 'rgb(255, 153, 153)',
            borderWidth: 3
          },
          {
            label: '장비2',
            data: [50, 200, 230, 300, 230],
            backgroundColor: '#D9A4F77f',
            borderColor: '#AA29F5',
            borderWidth: 3
          },
          {
            label: '장비3',
            data: [100, 150, 180, 200, 150],
            backgroundColor: '#29F59C7f',
            borderColor: '#29F59C',
            borderWidth: 3
          }
        ]
      }
    },
    makeChartData1() {
      this.chartData1 = {
        labels: ['1sec', '2sec', '3sec', '4sec', '5sec'],
        datasets: [
          {
            label: '장비1',
            data: [200, 300, 130, 150, 110],
            backgroundColor: '#F7A4A47f',
            borderColor: 'rgb(255, 153, 153)',
            borderWidth: 3
          },
          {
            label: '장비2',
            data: [50, 200, 230, 300, 230],
            backgroundColor: '#D9A4F77f',
            borderColor: '#AA29F5',
            borderWidth: 3
          },
          {
            label: '장비3',
            data: [100, 150, 180, 200, 150],
            backgroundColor: '#29F59C7f',
            borderColor: '#29F59C',
            borderWidth: 3
          }
        ]
      }
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
