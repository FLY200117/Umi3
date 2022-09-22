import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space, Tooltip } from 'antd';
import React from 'react';
import {useModel,history} from 'umi'

const App = () => {
  const { initialState,setInitialState } = useModel('@@initialState');


  const handleButtonClick = (e) => {
    console.log(initialState)
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick = ({key}) => {
    if(key === '2'){

      //清除初始化数据
      setInitialState({isLogin:false,userInfo:null})

      //清除本地数据
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')

      //退回登录页面
      history.push('/login')
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: '个人设置',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: '退出登录',
          key: '2',
          icon: <LogoutOutlined />,
        }
      ]}
    />
  );

  return  <Space wrap>
            <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
              {initialState.userInfo.username}
            </Dropdown.Button>
          </Space>
};

export default App;
