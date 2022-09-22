import { Button, Form, Input, Spin } from 'antd';
import React,{useEffect} from 'react';
import { bannerUpdate } from '@/api/cake'
import { useRequest,history } from 'umi'
import ImageUpload from '../../components/ImgUpload'


const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const edit = (props) => {
  let {query} = props.location
  const [form] = Form.useForm();
  let {data,loading,run} = useRequest((value) => {
    return bannerUpdate(query.objectId,value)
  },{manual: true}) //开启手动执行


  const onFinish = (values) => {
    run(values) //手动执行useRequest
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(query)
  },[])

  useEffect(() => { // 更新成功后返回列表页
    if(data){
      // history.push('/banner/list')
      history.goBack()
    }
  },[data])

  let initData = {
    title: query.title,
    link: query.link,
    imgurl: query.imgurl,
  }

  return (
    <Spin spinning={loading}>
      <Form {...layout} initialValues={initData} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="活动名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="link"
          label="活动链接"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imgurl"
          label="封面图片"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUpload/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            更新
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default edit;
