import { Space, Table, Button, Image } from 'antd';
import React from 'react';
import { bannerGet } from '@/api/cake'
import { useRequest,history,useAccess } from 'umi'


export default function list() {
  let access = useAccess()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '活动链接',
      dataIndex: 'link',
      key: 'link',
      render: (url) => <a href={url} target="_blank">点击预览</a>
    },
    {
      title: '活动封面',
      dataIndex: 'imgurl',
      key: 'imgurl',
      render: (url) => <Image src={url} height={50}></Image>
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record,index) => (
        <Space size="middle">
          <Button type='primary' size='small' disabled={!access.isRoot} onClick={() => {
            history.push({
              pathname: '/banner/edit',
              query: record
            })
          }}>编辑</Button>
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

  // 使用umi提供的插件Request，返回的数据格式需要是{data:any}，不然表格不能正常显示数据
  const { data,loading,error } = useRequest(bannerGet)

  return (
    <Table loading={loading} columns={columns} dataSource={data} rowKey="objectId" />
  )
}

