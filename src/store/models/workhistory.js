import api from '../apiUtil'
import axios from 'axios'

// 초기값 선언
const stateInit = {
  WorkHistory: {
    deviceId: null,
    // 디바이스 아이디
    sensorId: null,
    // 센서 아이디
    userId: null,
    // 유저 아이디
    inputQuantity: null,
    // 투입수량
    targetQuantity: null,
    // 목표수량
    outputQuantity: null,
    // 출력수량
    qualityQuantity: null,
    // 품질수량
    defectiveQuantity: null,
    // 불량수량
    defectiveRate: null,
    // 불량률
    stock: null,
    uptime: null,
    // 가동시간
    downtime: null,
    // 끝난시간
    leadtime: null,
    // 공정반복시간
    color: null,
    // 색선별
    ready: false,
    // 준비상태
    reset: false,
    // 리셋
    operating: null,
    // 운용
    createdAt: null
  }
}

export default {
  state: {
    WorkHistoryList: [],
    WorkHistory: { ...stateInit.WorkHistory },
    InsertedResult: null, // 입력처리 후 결과
    DoneResult: null, // 완료처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드
  },
  getters: {
    WorkHistoryList: state => state.WorkHistoryList,
    WorkHistory: state => state.WorkHistory,
    WorkHistoryInsertedResult: state => state.InsertedResult,
    WorkHistoryDoneResult: state => state.DoneResult,
    WorkHistoryDeletedResult: state => state.DeletedResult,
    WorkHistoryInputMode: state => state.InputMode
  },
  mutations: {
    setWorkHistoryList(state, data) {
      state.WorkHistoryList = data
    },
    setWorkHistory(state, data) {
      state.WorkHistory = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setDoneResult(state, data) {
      state.DoneResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 작업이력 리스트 조회
    actWorkHistoryList(context, payload) {
      // RestAPI 호춯
      api
        .get('/serverApi/workStatus')
        .then(response => {
          console.log('list', response)
          const workhistory = response && response.data
          context.commit('setWorkHistoryList', workhistory)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryList.error', error)
          context.commit('setWorkHistoryList', [])
        })
    },
    // 작업이력 입력
    actWorkHistoryInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      // RestAPI 호출
      axios
        .post('/serverApi/workStatus', payload)
        .then(response => {
          const insertedResult = response && response.data
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 준비상태 체크
    actWorkHistoryReady(context, payload) {
      // RestAPI 호출
      api
        .put(`/serverApi/workStatus/ready/${payload.id}`)
        .then(response => {
          console.log('actWorkHistoryReady', response)
          const workhistory = response && response.data
          context.commit('setWorkHistory', workhistory)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistory.error', error)
          context.commit('setWorkHistory', -1)
        })
    },
    // 작업이력 초기화
    actWorkHistoryInit(context, payload) {
      context.commit('setWorkHistory', { ...stateInit.WorkHistory })
    },
    // 입력모드 설정
    actWorkHistoryInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actWorkHistoryInfo(context, payload) {
      // 상태값 초기화
      context.commit('setWorkHistory', { ...stateInit.WorkHistory })
      // RestAPI 호출
      api
        .get(`/serverApi/workStatus/${payload}`)
        .then(response => {
          const workhistory = response && response.data
          context.commit('setWorkHistory', workhistory)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistory.error', error)
          context.commit('setWorkHistory', -1)
        })
    },
    // 작업이력 삭제
    actWorkHistoryDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)
      // RestAPI 호출
      api
        .put(`/serverApi/workStatus/done/${payload}`)
        .then(response => {
          console.log('delete', response)
          const deletedResult = response && response.data && response.data.deleteCount
          context.commit('setDoneResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryDelete.error', error)
          context.commit('setDoneResult', -1)
        })
    },
    // 비상정지 클릭
    actEmergency(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      // RestAPI 호출
      axios
        .post('/serverApi/workStatus/emergency', payload)
        .then(response => {
          const insertedResult = response && response.data
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    }
  }
}
