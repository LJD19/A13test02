import request from '@/utils/request'
import type { UserLoginParams, UserRegisterParams, UserResponse } from '@/types/user'

// 用户登录
export const login = (params: UserLoginParams): Promise<UserResponse> => {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}

// 用户注册
export const register = (params: UserRegisterParams): Promise<UserResponse> => {
  return request({
    url: '/register',
    method: 'post',
    data: params
  })
}

// 获取用户信息
export const getUserInfo = (userId: number): Promise<UserResponse> => {
  return request({
    url: `/me/${userId}`,
    method: 'get'
  })
}
