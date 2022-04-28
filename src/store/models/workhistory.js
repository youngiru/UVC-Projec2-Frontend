import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  WorkHistory: {
    deviceId: null, // 디바이스 아이디
    sensorId: null, // 센서 아이디
    // userId: null, // 유저 아이디
    userName: null, // 유저이름
    inputQuantity: null, // 투입량
    targetQuantity: null, // 목표수량
    outputQuantity: null, // 산출량 (양품 + 불량품)
    qualityQuantity: null, // 양품
    defectiveQuantity: null, // 불량품
    defectiveRate: null, // 불량률
    stock: null, // 재고수량
    uptime: null, // 시작버튼 누른 시각
    downtime: null, // 중지버튼 누른 시각
    leadtime: null, // 공정작업시간
    color: null, // 색선별
    ready: null, // 준비상태
    reset: null, // 리셋
    operating: null, // true: 가동중, false: 미가동
    createdAt: null, // 가동시간
    updatedAt: null // 끝난시간
  }
}

export default {
  state: {
    WorkHistoryList: [],
    WorkHistoryDoneList: [],
    WorkHistory: { ...stateInit.WorkHistory },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    DoneResult: null, // 완료처리 후 결과
    InputMode: null // 입력모드
  },
  getters: {
    WorkHistoryList: state => state.WorkHistoryList,
    WorkHistoryDoneList: state => state.WorkHistoryDoneList,
    WorkHistory: state => state.WorkHistory,
    WorkHistoryInsertedResult: state => state.InsertedResult,
    WorkHistoryUpdatedResult: state => state.UpdatedResult,
    WorkHistoryDeletedResult: state => state.DeletedResult,
    WorkHistoryDoneResult: state => state.DoneResult,
    WorkHistoryInputMode: state => state.InputMode
  },
  mutations: {
    setWorkHistoryList(state, data) {
      state.WorkHistoryList = data
    },
    setWorkHistoryDoneList(state, data) {
      state.WorkHistoryDoneList = data
    },
    setWorkHistory(state, data) {
      state.WorkHistory = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setDoneResult(state, data) {
      state.DoneResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 작업현황 리스트 조회
    actWorkHistoryList(context, payload) {
      // RestAPI 호출
      api
        .get('/serverApi/workStatus', { params: payload })
        .then(response => {
          const workhistory = response && response.data
          context.commit('setWorkHistoryList', workhistory)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryList.error', error)
          context.commit('setWorkHistoryList', [])
        })
    },
    // 작업이력 리스트 조회
    actWorkHistoryDoneList(context, payload) {
      // RestAPI 호출
      api
        .get('/serverApi/workStatus', { params: payload })
        .then(response => {
          const workhistoryDone = response && response.data
          context.commit('setWorkHistoryDoneList', workhistoryDone)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryDoneList.error', error)
          context.commit('setWorkHistoryDoneList', [])
        })
    },
    // 작업이력 입력
    actWorkHistoryInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      // RestAPI 호출
      api
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
    // 작업이력 수정
    actWorkHistoryUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      api
        .put(`/serverApi/workStatus/done/${payload}`)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedResult
          context.commit('setUpdatedResult', updatedResult)
          console.log('update', payload)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 작업이력 삭제
    actWorkHistoryDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeleteResult', null)
      // RestAPI 호출
      api
        .delete(`/serverApi/workStatus/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deleteCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
