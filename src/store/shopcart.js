import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'

export default {
  state: {
    cartList: [],
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList
    }
  },
  actions: {
    async getCartList({ commit }) {
      let result = await reqCartList();
      if (result.code == 200) {
        commit("GETCARTLIST", result.data);
      }
    },
    async deleteCartListBySkuId({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedByid(skuId, isChecked)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    async deleteAllCheckedCart({ dispatch, getters }) {
      //  获取购物车全部数据
      let PromiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        let promise = item.isChecked === 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
        // 每次返回的promise添加到数组中
        PromiseAll.push(promise)
      })
      // 只要全部的Promise都成功 返回的结果为成功 有一个失败就返回失败
      return Promise.all(PromiseAll)
    },
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
      //数组
      let promiseAll = [];
      state.cartList[0].cartInfoList.forEach((item) => {
        let promise = dispatch("updateCheckedById", {
          skuId: item.skuId,
          isChecked,
        });
        promiseAll.push(promise);
      });
      //最终返回结果
      return Promise.all(promiseAll);
    },
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || []
    },
  }
}