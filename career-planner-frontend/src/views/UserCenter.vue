<template>
  <div class="user-center-page">
    <h1 class="page-title">个人中心</h1>

    <!-- 基本信息 -->
    <el-card class="info-card">
      <template #header>
        <span class="card-title">基本信息</span>
      </template>
      <el-form label-position="top">
        <el-form-item label="用户名">
          <el-input :model-value="user?.username || ''" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input :model-value="user?.email || ''" disabled />
        </el-form-item>
        <el-form-item label="角色">
          <el-input :model-value="roleLabel" disabled />
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input :model-value="user?.created_at?.split('T')[0] || ''" disabled />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 修改密码 -->
    <el-card class="password-card">
      <template #header>
        <span class="card-title">修改密码</span>
      </template>
      <el-form label-position="top">
        <el-form-item label="当前密码">
          <el-input type="password" placeholder="输入当前密码" show-password />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" placeholder="输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input type="password" placeholder="再次输入新密码" show-password />
        </el-form-item>
        <el-button type="primary">更新密码</el-button>
      </el-form>
    </el-card>

    <!-- 危险操作 -->
    <el-card class="danger-card">
      <template #header>
        <span class="card-title danger-title">危险操作</span>
      </template>
      <p class="danger-desc">退出登录后需要重新登录才能访问系统</p>
      <el-button type="danger" @click="handleLogout">退出登录</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const user = computed(() => userStore.user)

const roleLabel = computed(() => {
  const roleMap: Record<string, string> = {
    student: '学生',
    mentor: '导师',
    admin: '管理员'
  }
  return roleMap[user.value?.role || 'student'] || user.value?.role || '学生'
})

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.user-center-page {
  max-width: 600px;
  margin: 0 auto;

  .page-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
}

.card-title {
  font-weight: 600;
}

.info-card,
.password-card {
  margin-bottom: 1.5rem;
}

.danger-card {
  border-color: #fde2e2;

  .danger-title {
    color: #f56c6c;
  }

  .danger-desc {
    font-size: 0.875rem;
    color: #606266;
    margin-bottom: 1rem;
  }
}
</style>
