export interface UserPreview {
  id: number
  first_name: string
  last_name: string
}

export interface Task {
  id: number
  title: string
  description: string
  due_time?: string
  status: string
  score: number
  category?: string
  assigned_to?: UserPreview
}

export interface ChatMessage {
  id: number
  author_id: number
  message_type: 'text' | 'image' | 'file' | 'audio' | 'video'
  content?: string
  attachment_url?: string
  created_at: string
}

export interface ExecutiveHeadline {
  total_tasks: number
  completed: number
  in_progress: number
  pending_review: number
  rejected: number
  overdue: number
  average_score: number
  score_volume: number
  completion_rate: number
}

export interface DepartmentSnapshot {
  department: string
  total: number
  completed: number
  pending: number
}

export interface PerformerSnapshot {
  name: string
  score: number
  role?: string
  department?: string
}

export interface RecentActivityItem {
  id: number
  title: string
  status: string
  score: number
  assignee: string
  due_time?: string | null
  updated_at?: string | null
}

export interface ExecutiveOverview {
  headline: ExecutiveHeadline
  department_breakdown: DepartmentSnapshot[]
  top_performers: PerformerSnapshot[]
  recent_activity: RecentActivityItem[]
}
