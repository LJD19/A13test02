import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', requiresAuth: true }
  },
  {
    path: '/jobs',
    name: 'JobExplore',
    component: () => import('@/views/JobExplore.vue'),
    meta: { title: '岗位探索', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'StudentProfile',
    component: () => import('@/views/StudentProfile.vue'),
    meta: { title: '学生画像', requiresAuth: true }
  },
  {
    path: '/plan',
    name: 'CareerPlan',
    component: () => import('@/views/CareerPlan.vue'),
    meta: { title: '职业规划', requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'ReportCenter',
    component: () => import('@/views/ReportCenter.vue'),
    meta: { title: '报告中心', requiresAuth: true }
  },
  {
    path: '/ai',
    name: 'AIAssistant',
    component: () => import('@/views/AIAssistant.vue'),
    meta: { title: 'AI助手', requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'UserCenter',
    component: () => import('@/views/UserCenter.vue'),
    meta: { title: '个人中心', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 从 localStorage 获取认证状态
  const authStorage = localStorage.getItem('auth-storage')
  let isAuthenticated = false

  if (authStorage) {
    try {
      const authData = JSON.parse(authStorage)
      // 检查 user 和 token 是否存在（而不是 isAuthenticated 计算属性）
      const user = authData?.user
      const token = authData?.token
      isAuthenticated = !!(user && token)
    } catch (e) {
      console.error('解析认证信息失败:', e)
    }
  }

  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} | 职业规划智能体`
  }

  // 需要认证但未登录
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // 已登录但访问登录页
  if (to.path === '/login' && isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router
