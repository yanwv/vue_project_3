// search 模块仓库

import { reqGetSearchInfo } from '@/api'
export default ({
  state: {
    searchList: {}
  },
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList;
    }
  },
  actions: {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
      let result = await reqGetSearchInfo(params);
      if (result.code == 200) {
        commit("GETSEARCHLIST", result.data);
      }
    }
  },
  modules: {
  },
  // 简化数据  方便以后获取数据
  getters: {
    // state是当前仓库的state 不是大仓库的state
    goodsList(state) {
      // 假如网络出错state.searchList.goodsList应该返回的是undefined
      // 计算新的属性的属性值至少来一个数组
      return state.searchList.goodsList || [];
    },
    trademarkList(state) {
      return state.searchList.trademarkList;
    },
    attrsList(state) {
      return state.searchList.attrsList
    }
  }
})
