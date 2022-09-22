import mockjs from 'mockjs'

let datalist = mockjs.mock({
  code: 200,
  msg: '加载成功',
  'results|100': [
    {
      name: '@cname',
      score: '@integer(50,100)',
      city: '@city',
      time: '@date',
      'objectId|+1': 1
    }
  ]
})


export default {
  'GET /classes/stu': datalist,
  'DELETE /classes/stu': (req,res) => {
    console.log(req.query)
    let {id} = req.query
    for(let i = 0;i<datalist.results.length;i++){
      if(datalist.results[i].objectId == id){
        datalist.results.splice(i,1)
        res.send({
          code: 200,
          msg: '删除成功'
        })
        return
      }
    }
    res.send({
      code: 100,
      msg: '未找到对应数据'
    })
  }
}
