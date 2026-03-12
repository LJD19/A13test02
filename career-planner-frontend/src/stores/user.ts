import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserLoginParams, UserRegisterParams, UserResponse } from '@/types/user'
import { login as loginApi, register as registerApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // 登录
  const login = async (loginData: UserLoginParams): Promise<UserResponse> => {
    try {
      const response = await loginApi(loginData)
      setAuth({
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role as 'student' | 'mentor' | 'admin'
      }, response.token)
      return response
    } catch (error: any) {
      throw error
    }
  }

  // 注册
  const register = async (registerData: UserRegisterParams): Promise<UserResponse> => {
    try {
      const response = await registerApi(registerData)
      // 注册成功后自动设置认证信息
      setAuth({
        id: response.id,
        username: response.username,
        email: response.email,
        role: response.role as 'student' | 'mentor' | 'admin'
      }, response.token)
      return response
    } catch (error: any) {
      throw error
    }
  }

  // 设置认证信息
  const setAuth = (userData: User, tokenValue: string) => {
    user.value = userData
    token.value = tokenValue
  }

  // 登出
  const logout = () => {
    user.value = null
    token.value = null
  }

  // 更新用户信息
  const updateUser = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  // 获取用户信息
  const getUser = computed(() => user.value)

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    setAuth,
    logout,
    updateUser,
    getUser
  }
}, {
  // 持久化配置
  persist: {
    key: 'auth-storage',
    storage: localStorage
  }
})
