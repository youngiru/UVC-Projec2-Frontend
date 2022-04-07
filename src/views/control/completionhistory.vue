<template>
  <div id="completion_wrap">
    <app-header />
    <h2>완료이력</h2>
    <div id="completion_end">
      <b-button variant="dark">리셋</b-button>
      <b-table striped hover :fields="end" :items="end_items"></b-table>
    </div>
  </div>
</template>

<script>
import Header from '../../components/layout/controlheader.vue'

export default {
  components: {
    'app-header': Header
  },
  data() {
    return {
      end: [
        {
          key: 'target',
          label: '목표수량'
        },
        {
          key: 'operator',
          label: '담당작업자'
        },
        {
          key: 'time',
          label: '공정반복시간'
        },
        {
          key: 'color',
          label: '색 선별'
        },
        {
          key: 'input',
          label: '투입수량'
        },
        {
          key: 'completion',
          label: '완료수량'
        },
        {
          key: 'start',
          label: '시작시간'
        },
        {
          key: 'end',
          label: '끝시간'
        }
      ],
      end_items: [
        {
          target: true,
          operator: 40,
          time: 'Dickerson',
          color: 'Macdonald',
          input: 'Macdonald',
          completion: 'Macdonald',
          start: 'Macdonald',
          end: 'Macdonald'
        }
      ]
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
