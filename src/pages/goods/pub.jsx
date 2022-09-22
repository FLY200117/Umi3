import { Button, Form, Spin,Select } from 'antd';
import React from 'react';
import { cateGet,goodsAdd } from '@/api/cake'
import { useRequest } from 'umi'
import MyEditor from '@/components/MyEditor'

const {Option} = Select

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

const GoodsPub = () => {
  const [form] = Form.useForm();
  let {data,loading} = useRequest(cateGet)
  const onFinish = (values) => {
    goodsAdd(values).then(res => {
      console.log('响应发送',res)
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="cateId"
          label="分类选择 "
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="请选择商品分类"
          >
            {
              data?.map(item => {
                return <Option value={item.objectId} key={item.catename}>{item.catename}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="detail"
          label="商品详情"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MyEditor/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default GoodsPub;
