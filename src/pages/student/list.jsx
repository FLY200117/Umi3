import { Space, Table, Button } from 'antd';
import React,{ useState,useEffect } from 'react';
import { stuGet ,stuDel } from '@/api/stu'
import { useRequest } from 'umi'


export default function StuList() {
  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record,index) => (
        <Space size="middle">
          <Button type='primary' size='small'>编辑</Button>
          <Button type='primary' size='small' danger onClick={() => {
            stuDel(record.objectId).then(res => {
              data.splice(index,1)
              setData([...data])
            })
          }}>删除</Button>
        </Space>
      ),
    },
  ];

  // let [data,setData] = useState([])
  // let [loading,setLoading] = useState(true)

  // 使用umi提供的插件Request，返回的数据格式需要是{data:any}，不然表格不能正常显示数据
  const { data,loading,error } = useRequest(stuGet)
  // useEffect(() => {
  //   // stuGet().then(res => {
  //   //   console.log(res)
  //   //   setData(res.results)
  //   //   // 关闭loading
  //   //   setLoading(false)
  //   // })

  // },[])

  return (
    <Table loading={loading} columns={columns} dataSource={data} rowKey="objectId" />
  )
}
