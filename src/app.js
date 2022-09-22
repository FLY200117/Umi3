// 项目运行时配置
import {message} from 'antd'
import './utils/init-leancloud-sdk' //初始化Leancloud的sdk
import {history} from 'umi'
import HeaderDropMenu from './components/HeaderDropMenu'

export const request = {
  requestInterceptors: [
    (url,options) => {
      // console.log(url,options)
      options.url = 'https://knhoeavt.lc-cn-n1-shared.com/1.1' + url
      options.headers = {
        "X-LC-Id": "KnHoeaVtogFVswpZOQlzQ2D7-gzGzoHsz" ,
        "X-LC-Key": "ZvQxKHwtLNcOJyra6fmsxOgL" ,
        "Content-Type": "application/json"
      }
      return options

    }
  ],
  responseInterceptors: [
    async(response,options) => {
      let res = await response.json()

      if(res.objectId){
        let method = options.method.toLowerCase()
        if(method=='post' && res.sessionToken){
          let msg = options.url.indexOf('/login')== -1?'账号分配成功':'登录成功'
          message.success(msg)
        }else{
          let msg = method == 'post'?'新增成功':'更新成功'
          message.success(msg)
        }
      }
      // console.log(res,options)
      let {results} = res
      let data = results ? results: res
      return {data}
    }
  ],
}

// 项目全局数据初始化
export async function getInitialState() {
  let userState = {
    isLogin: false,
    userInfo: null
  }
  let info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
  if(info){
    userState.isLogin = true
    userState.userInfo = JSON.parse(info)
  }
  return userState
}

// layout运行时配置，自定义控制layout渲染逻辑
export const layout = ({initialState}) => {
  return {
    onPageChange: () => {
      // 此处根据用户的登录状态，重定向登录页面
      // console.log(initialState)
      let {isLogin} = initialState
      if(!isLogin){
        history.push('/login')
      }
    },
    rightContentRender: () => {
      return <HeaderDropMenu/>
    }
  }
}
