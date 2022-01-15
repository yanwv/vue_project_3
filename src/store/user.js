import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

export default {
  state: {
    code: "",
    token: getToken(),
    userInfo: {},
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
    USERLOGIN(state, token) {
      state.token = token
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR(state) {
      //帮仓库中先关用户信息清空
      state.token = '';
      state.userInfo = {};
      //本地存储数据清空
      removeToken();
    }
  },
  actions: {
    //获取验证码
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      if (result.code == 200) {
        commit("GETCODE", result.data);
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    async userLogin({ commit }, data) {
      let res = await reqUserLogin(data)
      if (res.code === 200) {
        commit('USERLOGIN', res.data.token)
        setToken(res.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    async getUserInfo({ commit }) {
      let res = await reqUserInfo()
      if (res.code === 200) {
        commit('GETUSERINFO', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    async userLogout({ commit }) {
      //只是向服务器发起一次请求，通知服务器清除token
      let result = await reqLogout();
      //action里面不能操作state，提交mutation修改state
      if (result.code == 200) {
        commit("CLEAR");
        return 'ok';
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
  },
  getters: {}
}