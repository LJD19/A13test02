// 用户相关类型

// 登录参数
export interface UserLoginParams {
  username: string
  password: string
}

// 注册参数
export interface UserRegisterParams {
  username: string
  email: string
  password: string
  role?: 'student' | 'mentor' | 'admin'
}

// 用户响应数据
export interface UserResponse {
  id: number
  username: string
  email: string
  role: string
  token: string
  created_at?: string
}

// 用户信息
export interface User {
  id: number
  username: string
  email: string
  role: 'student' | 'mentor' | 'admin'
  created_at?: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 兼容旧类型
export type LoginRequest = UserLoginParams
export type RegisterRequest = UserRegisterParams
export type AuthResponse = ApiResponse<UserResponse>
