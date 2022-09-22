// 动态生成权限数据
export default function(initialState){
  let {role} = initialState.userInfo?initialState.userInfo:{role: ''}
  return {
    isRoot: role ==='root',
    isAdmin: role ==='root' || role === 'admin',
    isWorker: true
  }
}
