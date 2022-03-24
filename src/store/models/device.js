import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Device: {
    id: null,
    name: null,
    location: null,
    edge_serial_number: null,
    newwork_interface: null,
    newwork_config: null,
    description: null,
    operating: null,
    ready_state: null,
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
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    DeviceList: state => state.DeviceList,
    Device: state => state.Device,
    DeviceInsertedResult: state => state.InsertedResult,
    DeviceUpdatedResult: state => state.UpdatedResult,
    DeviceDeletedResult: state => state.DeletedResult,
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
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 기기 리스트 조회
    actDeviceList(context, payload) {
      const deviceList = [
        {
          id: 1,
          name: 'fdgdsfg',
          location: 'gdsgf',
          description: 'teste',
          role: 'leader',
          active: 'true',
          createdAt: '2022-03-01T00:00:00.000Z',
          updatedAt: null
        }
      ]
      context.commit('setDeviceList', deviceList)

      // api.get('/serverApi/devices').then(response => {
      //   const deviceList = response && response.data
      //   context.commit('setUserList', deviceList)
      // })
    },

    // 기기 입력
    actDeviceInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      // 테스트 데이터 세팅
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300)

      /* RestAPI 호출 */

      // api.post('/serverApi/devices').then(response => {
      //   const insertedResult = response && response.insertedId
      //   context.commit('setInsertedResult', insertedResult)
      // })
    },
    // 기기정보 초기화
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

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const deviceList = [
          {
            id: 1,
            name: 'fdgdsfg',
            location: 'gdsgf',
            description: 'teste',
            role: 'leader',
            active: 'true',
            createdAt: '2022-03-01T00:00:00.000Z',
            updatedAt: null
          }
        ]

        let device = { ...stateInit.User }
        for (let i = 0; i < deviceList.length; i += 1) {
          if (payload === deviceList[i].id) {
            device = { ...deviceList[i] }
          }
        }
        context.commit('setDevice', device)
      }, 300)

      /* RestAPI 호출 */
      // api.get('/serverApi/devices/${payload}').then(response => {
      //   const device = response && response.device
      //   context.commit('setDevice', device)
      // })
    },
    // 기기 수정
    actDeviceUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      // api.put('/serverApi/devices/${payload}').then(response => {
      //   const updatedResult = response && response.updatedCount
      //   context.commit('setUpdatedResult', updatedResult)
      // })
    },
    actDeviceDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      // api
      //   .delete(`/serverApi/device/${payload}`)
      //   .then(response => {
      //     const deletedResult = response && response.data
      //     context.commit('setDeletedResult', deletedResult)
      //   })
      //   .catch(error => {
      //     // 에러인 경우 처리
      //     console.error('DeviceDelete.error', error)
      //     context.commit('setDeletedResult', -1)
      //   })
    }
  }
}
