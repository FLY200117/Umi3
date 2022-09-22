import { request } from 'umi'

export const userLogin = (user) => {
  return request('/login',{
    method: 'POST',
    data: user
  })
}

export const userReg = (user) => { // 账号分配接口
  return request('/users',{
    method: 'POST',
    data: user
  })
}

export const roleAdd = (roleObj) => {
  return request('/classes/RoleManager',{
    method: 'POST',
    data: roleObj
  })
}

export const roleGet = () => {
  return request('/classes/RoleManager',{
    method: 'GET'
  })
}

