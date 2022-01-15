import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

export default {
  state: {
    goodInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
  },
  mutations: {
    GETGOODINFO(state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },
  actions: {
    // 获取产品信息
    async getGoodInfo({ commit }, skuId) {
      let result = await reqGoodsInfo(skuId)
      if (result.code === 200) {
        commit('GETGOODINFO', result.data)
      }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code === 200) {
        return "ok";
      } else {
        //返回的是失败的标记
        return Promise.reject(new Error("faile"));
      }
    }
  },
  getters: {
    //路径导航简化的数据
    categoryView(state) {
      // state.goodInfo初始状态空对象 空对象的categoryView属性值undefined  当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
      return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state) {
      return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || [];
    },
  }
}