import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
  // 先从本地获取uuid试试
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果没有就生成一个
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4()
    // 存储到本地
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}