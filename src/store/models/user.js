import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  User: {
    id: null,
    name: null,
    userid: null,
    password: null,
    position: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    UserList: state => state.DepartmentList,
    User: state => state.Department,
    UserInsertedResult: state => state.InsertedResult,
    UserUpdatedResult: state => state.UpdatedResult,
    UserInputMode: state => state.InputMode
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
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
    actUserInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* RestAPI 호출 */

      api.post('/serverApi/users').then(response => {
        const insertedResult = response && response.insertedId
        context.commit('setInsertedResult', insertedResult)
      })
    },
    // 사용자정보 초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
    },
    // 입력모드 설정
    actUserInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 사용자 상세정보 조회
    actDepartmentInfo(context, payload) {
      // 상태값 초기화
      context.commit('setDepartment', { ...stateInit.Department })

      /* RestAPI 호출 */
      api.get('/serverApi/users/${payload}').then(response => {
        const department = response && response.department
        context.commit('setDepartment', department)
      })
    },
    // 사용자 수정
    actDepartmentUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* RestAPI 호출 */
      api.put('/serverApi/users/${payload}').then(response => {
        const updatedResult = response && response.updatedCount
        context.commit('setUpdatedResult', updatedResult)
      })
    }
  }
}
