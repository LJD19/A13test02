// 学生画像相关类型

export interface StudentProfile {
  id: string
  user_id: string
  name: string
  gender?: string
  age?: number
  school: string
  major: string
  education: string
  skills?: string[]
  certificates?: string[]
  experience?: string[]
  ability_scores?: Record<string, number>
  updated_at: string
}

export interface CreateProfileRequest {
  user_id: string
  name: string
  gender?: string
  age?: number
  school: string
  major: string
  education: string
  skills?: string[]
  certificates?: string[]
  experience?: string[]
}

export interface UpdateProfileRequest extends Partial<CreateProfileRequest> {
  user_id: string
}
