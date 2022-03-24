import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  User: {
    id: null,
    userid: null,
    password: null,
    name: null,
    rank: null,
    email: null,
    phone: null,
    role: null,
    active: null,
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
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    UserUpdatedResult: state => state.UpdatedResult,
    UserDeletedResult: state => state.DeletedResult,
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
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 사용자 리스트 조회
    actUserList(context, payload) {
      const userList = [
        {
          id: 1,
          name: '김영일',
          userid: 'kim456',
          password: '123123',
          rank: '팀장',
          email: 'kim123@email.com',
          phone: '010-0123-4567',
          role: 'leader',
          active: 'true',
          createdAt: '2022-03-01T00:00:00.000Z',
          updatedAt: null
        }
      ]
      context.commit('setUserList', userList)

      // api.get('/serverApi/users').then(response => {
      //   const userList = response && response.data
      //   context.commit('setUserList', userList)
      // })
    },
    // 사용자 입력
    actUserInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      // 테스트 데이터 세팅
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300)

      /* RestAPI 호출 */

      // api.post('/serverApi/users').then(response => {
      //   const insertedResult = response && response.insertedId
      //   context.commit('setInsertedResult', insertedResult)
      // })
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
    actUserInfo(context, payload) {
      // 상태값 초기화
      context.commit('setUser', { ...stateInit.User })

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const userList = [
          {
            id: 1,
            name: '김영일',
            userid: 'kim456',
            password: '123123',
            rank: '팀장',
            email: 'kim123@email.com',
            phone: '010-0123-4567',
            role: 'leader',
            active: 'true',
            createdAt: '2022-03-01T00:00:00.000Z',
            updatedAt: null
          }
        ]

        let user = { ...stateInit.User }
        for (let i = 0; i < userList.length; i += 1) {
          if (payload === userList[i].id) {
            user = { ...userList[i] }
          }
        }
        context.commit('setUser', user)
      }, 300)

      /* RestAPI 호출 */
      // api.get('/serverApi/users/${payload}').then(response => {
      //   const user = response && response.user
      //   context.commit('setUser', user)
      // })
    },
    // 사용자 수정
    actUserUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      // api.put('/serverApi/users/${payload}').then(response => {
      //   const updatedResult = response && response.updatedCount
      //   context.commit('setUpdatedResult', updatedResult)
      // })
    },
    actUserDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      // api
      //   .delete(`/serverApi/user /${payload}`)
      //   .then(response => {
      //     const deletedResult = response && response.data
      //     context.commit('setDeletedResult', deletedResult)
      //   })
      //   .catch(error => {
      //     // 에러인 경우 처리
      //     console.error('UsertDelete.error', error)
      //     context.commit('setDeletedResult', -1)
      //   })
    }
  }
}
