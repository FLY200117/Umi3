import {request} from 'umi'

// 新增分类
export const cateAdd = (cateObj) => {
  return request('/classes/CakeCate',{
    method: 'POST',
    data: cateObj
  })
}

export const cateGet = () => {
  return request('/classes/CakeCate',{
    method: 'GET'
  })
}

export const bannerAdd = (bannerObj) => {
  return request('/classes/CakeBanner',{
    method: 'POST',
    data: bannerObj
  })
}

export const bannerGet = () => {
  return request('/classes/CakeBanner',{
    method: 'GET'
  })
}

export const bannerUpdate = (objectId,bannerObj) => {
  return request(`/classes/CakeBanner/${objectId}`,{
    method: 'PUT',
    data: bannerObj
  })
}

export const goodsAdd = (cakeObj) => {
  return request('/classes/CakeGoods',{
    method: 'POST',
    data: cakeObj
  })
}
