import { request } from 'umi'

export const stuGet = () => {
  return request('/classes/stu',{
    method: 'GET'
  })
}

export const stuDel = (id) => {
  return request(`/classes/stu?id=${id}`,{
    method: 'DELETE'
  })
}
