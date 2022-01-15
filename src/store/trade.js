import { reqAddressInfo, reqOrderInfo } from '@/api'

export default {
  state: {
    address: [],
    orderInfo: {}
  },
  mutations: {
    GETUSERADDRESS(state, address) {
      state.address = address
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
    }
  },
  actions: {
    async getUserAddress({ commit }) {
      let res = await reqAddressInfo()
      if (res.code === 200) {
        commit('GETUSERADDRESS', res.data)
      }
    },
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo();
      if (result.code == 200) {
        commit("GETORDERINFO", result.data);
      }
    },
  },
  getters: {}
}