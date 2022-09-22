import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Ant Design',
    locale: true,
    layout: 'side',
  },
  dva: { // 开启插件dva
    immer: false
  },
  antd: {
    dark: false
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/index',
      name: '登录',
      layout: false,
      hideInMenu: true
    },
    {
      path: '/',
      component: '@/pages/index',
      name: '数据统计',
      icon: 'AreaChartOutlined',
      access: 'isRoot'
    },
    {
      path: '/stu',
      name: '学员管理',
      icon: 'GitlabOutlined',
      component: '@/pages/student/list',
    },
    {
      path: '/category',
      name: '分类管理',
      icon: 'AliwangwangOutlined',
      access: 'isAdmin',
      component: '@/pages/category/catepub',
    },
    {
      path: '/banner',
      name: '轮播管理',
      icon: 'WindowsOutlined',
      access: 'isAdmin',
      routes: [
        {
          path: '/banner/list',
          component: '@/pages/banner/list',
          name: '轮播列表',
        },
        {
          path: '/banner/pub',
          component: '@/pages/banner/pub',
          name: '轮播发布',
        },
        {
          path: '/banner/edit',
          component: '@/pages/banner/edit',
          name: '轮播编辑',
          hideInMenu: true
        }
      ]
    },
    {
      path: '/goods',
      name: '商品管理',
      icon: 'CodeSandboxOutlined',
      access: 'isAdmin',
      component: '@/pages/goods/pub',
    },
    {
      path: '/notice',
      name: '状态管理',
      icon: 'CodeSandboxOutlined',
      routes: [
        {
          path: '/notice/list',
          component: '@/pages/notice/notice',
          name: '消息中心',
        }
      ]
    },
    {
      path: '/sys',
      name: '系统设置',
      icon: 'CodeSandboxOutlined',
      access: 'isRoot',
      routes: [
        {
          path: '/sys/role',
          component: '@/pages/systern/RoleManager',
          name: '角色管理',
        },
        {
          path: '/sys/user',
          component: '@/pages/systern/UserManager',
          name: '用户管理',
        }
      ]
    },
    {
      path: '/area',
      name: '高德地图',
      component: '@/pages/area/area',
      icon: 'HeatMapOutlined'
    }
  ],
  fastRefresh: {},
  mfsu: {},
});
