import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/user',
    name: '用户管理',
    meta: {
      icon: 'md-menu',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'employee',
        name: '教师管理',
        meta: {
          icon: 'md-funnel',
          title: 'tercher'
        },
        component: () => import('@/view/user/Employee.vue')
      },
      {
        path: 'department',
        name: '部门管理',
        meta: {
          icon: 'md-funnel',
          title: 'department'
        },
        component: () => import('@/view/user/Department.vue')
      }
    ]
  },
  {
    path:'/assessment',
    name:'效绩考核',
    meta:{
      icon: 'md-menu',
      title: '效绩考核'
    },
    component:Main,
    children:[
        {
          path:'assessment_chart',
          name:'assessment_chart',
          meta:{
              icon:'md-funnel',
              title:'assessment_chart'
          },
          component: () => import('@/view/assessment/assessment_chart.vue')
        },
        {
          path:'assessment_table',
          name:'assessment_table',
          meta:{
              icon:'md-funnel',
              title:'assessment_table'
          },
          component: () => import('@/view/assessment/assessment_table.vue')
        }
    ]
  },
  {
    path:'/inside',
    name:'校内工作量',
    meta:{
      icon: 'md-menu',
      title: '校内工作量'
    },
    component: Main,
    children:[
      {
        path:'chart',
        name:'chart',
        meta:{
          icon:'md-funnel',
          title:'chart'
        },
        component: () => import('@/view/inside/charts.vue')
      },
      {
        path:'table',
        name:'table',
        meta:{
          icon:'md-funnel',
          title:'table'
        },
        component: () => import('@/view/inside/table.vue')
      },
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      }
    ]
  },
  {
      path:'/outside',
      name:'校外工作量',
      meta:{
        icon:'md-menu',
        title:'校外工作量'
      },
      component:Main,
      children:[
          {
            path:'charts',
            name:'charts',
            meta:{
              icon: 'md-funnel',
              title:'charts'
            },
          component: () => import('@/view/outside/charts.vue')
          },
          {
            path:'tables',
              name:'tables',
              meta:{
                icon: 'md-funnel',
                title:'tables'
              },
            //component: () => import('@/view/outside/tables.vue')
           // component: () => import('@/view/outside/Out_table.vue')
          },
          {
            path: 'upload-excels',
            name: 'upload-excel',
            meta: {
              icon: 'md-add',
              title: '导入EXCEL'
            },
            component: () => import('@/view/excel/upload-excel.vue')
          }
      ]
  },

  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]