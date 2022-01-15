// home 模块仓库

import { reqgetCategoryList, reqGetBannerList, reqFloorList } from '@/api'

export default ({
  state: {
    categoryList: [], // 三级菜单数据
    bannerList: [], // 轮播图数据
    floorList: []
  },
  mutations: {
    GETCATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList;
    }
  },
  actions: {
    // 通过API里面的接口函数调用 向服务器发请求 获取服务器的数据
    async getCategoryList({ commit }) {
      let result = await reqgetCategoryList();
      if (result.code == 200) {
        commit("GETCATEGORYLIST", result.data);
      }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
      let result = await reqGetBannerList();
      if (result.code == 200) {
        commit("GETBANNERLIST", result.data);
      }
    },
    // 获取floor
    async getFloorList({ commit }) {
      let result = await reqFloorList()
      if (result.code === 200) {
        commit('GETFLOORLIST', result.data);
      }
    }
  },
  modules: {
  }
})
