<template>
  <div id="completion_wrap">
    <app-header />
    <h2>완료이력</h2>
    <div id="completion_before">
      <h3>작업 전</h3>
      <b-button variant="dark">스타트</b-button>
      <div>
        <b-table striped hover :fields="before" :items="before_items"></b-table>
      </div>
    </div>
    <div id="completion_working">
      <h3>작업 중</h3>
      <b-button variant="dark">비상정지</b-button>
      <div>
        <b-table striped hover :fields="working" :items="working_items"></b-table>
      </div>
    </div>
    <div id="completion_end">
      <h3>작업 완료</h3>
      <b-button variant="dark">리셋</b-button>
      <div>
        <b-table striped hover :fields="end" :items="end_items"></b-table>
      </div>
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
      before: [
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
        }
      ],
      working: [
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
          key: 'start',
          label: '시작시간'
        },
        {
          key: 'input',
          label: '투입수량'
        }
      ],
      end: ['first_name', 'last_name', 'age'],
      before_items: [{ target: true, operator: 40, time: 'Dickerson', color: 'Macdonald' }],
      working_items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      end_items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
