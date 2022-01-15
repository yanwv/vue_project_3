// 对外暴露函数

export const setToken = (token) => {
  localStorage.setItem('TOKEN', token)
}

//清除本地存储的token
export const removeToken = () => {
  localStorage.removeItem("TOKEN");
}

//获取token
export const getToken = () => {
  return localStorage.getItem("TOKEN");
};
