import request from '@/utils/request'

// 上传简历生成画像（占位接口）
export const uploadResume = (formData: FormData) => {
  return request({
    url: '/student/profile/upload',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 保存自定义学生画像（占位接口）
export const saveStudentProfile = (data: any) => {
  return request({
    url: '/student/profile/save',
    method: 'post',
    data
  })
}

// 获取学生画像（占位接口）
export const getStudentProfile = () => {
  return request({
    url: '/student/profile',
    method: 'get'
  })
}
