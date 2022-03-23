import Vue from 'vue'
import Vuex from 'vuex'
import User from './models/user'
import Device from './models/device'
import Auth from './models/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    User,
    Device,
    Auth
  }
})
