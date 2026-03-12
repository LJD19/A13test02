// 导出所有类型
export * from './user'
export * from './student'

// 岗位类型
export interface Job {
  id: string
  name: string
  type: string
  industry: string
  salary_min?: number
  salary_max?: number
  location?: string
  description?: string
}

// 匹配结果类型
export interface MatchResult {
  id: string
  student_id: string
  job_id: string
  total_score: number
  dimension_scores?: Record<string, number>
  created_at: string
}

// 报告类型
export interface Report {
  id: string
  title: string
  created_at: string
  status: 'draft' | 'published'
}
