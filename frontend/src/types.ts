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
