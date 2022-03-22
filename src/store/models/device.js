import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Device: {
    id: null,
    name: null,
    active: null,
    inspection: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    DeviceList: [],
    Device: { ...stateInit.Device },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    DeviceList: state => state.DeviceList,
    Device: state => state.Device,
    DeviceInsertedResult: state => state.InsertedResult,
    DeviceUpdatedResult: state => state.UpdatedResult,
    DeviceInputMode: state => state.InputMode
  },
  mutations: {
    setDeviceList(state, data) {
      state.DeviceList = data
    },
    setDevice(state, data) {
      state.Device = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    /* RestAPI 호출 */

    // 사용자 입력
    actDeviceInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* RestAPI 호출 */

      api.post('/serverApi/devices').then(response => {
        const insertedResult = response && response.insertedId
        context.commit('setInsertedResult', insertedResult)
      })
    },
    // 사용자정보 초기화
    actDeviceInit(context, payload) {
      context.commit('setDevice', { ...stateInit.Device })
    },
    // 입력모드 설정
    actDeviceInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 사용자 상세정보 조회
    actDeviceInfo(context, payload) {
      // 상태값 초기화
      context.commit('setDevice', { ...stateInit.Device })

      /* RestAPI 호출 */
      api.get('/serverApi/devices/${payload}').then(response => {
        const device = response && response.device
        context.commit('setDevice', device)
      })
    },
    // 사용자 수정
    actDeviceUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* RestAPI 호출 */
      api.put('/serverApi/devices/${payload}').then(response => {
        const updatedResult = response && response.updatedCount
        context.commit('setUpdatedResult', updatedResult)
      })
    }
  }
}
