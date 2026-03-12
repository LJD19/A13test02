<template>
  <div class="dashboard-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1 class="logo">职业规划智能体</h1>
      </div>
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <el-button @click="handleLogout">退出登录</el-button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部栏 -->
      <header class="header">
        <div class="header-left">
          <span class="role-info">当前角色：{{ roleLabel }}</span>
        </div>
        <div class="header-right">
          <el-input
            v-model="searchKeyword"
            placeholder="全局搜索..."
            class="search-input"
            clearable
          />
          <div class="user-info">
            <el-avatar :size="32" :src="avatarUrl" />
            <span class="username">{{ username }}</span>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <div class="page-content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const searchKeyword = ref('')

const navItems = [
  { id: 'home', label: '首页', path: '/' },
  { id: 'jobs', label: '岗位探索', path: '/jobs' },
  { id: 'profile', label: '学生画像', path: '/profile' },
  { id: 'plan', label: '职业规划', path: '/plan' },
  { id: 'reports', label: '报告中心', path: '/reports' },
  { id: 'ai', label: 'AI助手', path: '/ai' },
  { id: 'settings', label: '个人中心', path: '/settings' }
]

const username = computed(() => userStore.user?.username || '用户')

const roleLabel = computed(() => {
  const roleMap: Record<string, string> = {
    student: '学生',
    mentor: '导师',
    admin: '管理员'
  }
  return roleMap[userStore.user?.role || 'student'] || '学生'
})

const avatarUrl = computed(() => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userStore.user?.username || 'user'}`
})

const isActive = (path: string) => {
  return route.path === path
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
  overflow: hidden;
}

.sidebar {
  width: 256px;
  background: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e4e7ed;

  .logo {
    font-size: 1.25rem;
    font-weight: bold;
    color: #409eff;
  }
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #606266;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #f5f7fa;
    color: #409eff;
  }

  &.active {
    background: #ecf5ff;
    color: #409eff;
    font-weight: 500;
  }
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e4e7ed;

  :deep(.el-button) {
    width: 100%;
  }
}

.main-content {
  flex: 1;
  margin-left: 256px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header {
  background: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-left {
  .role-info {
    font-weight: 500;
    color: #303133;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;

  .search-input {
    width: 256px;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .username {
      color: #303133;
    }
  }
}

.page-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
