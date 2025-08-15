export type Role = 'system' | 'user' | 'assistant'

export interface Message {
  role: Role
  content: string
  starred: boolean
}

export interface Persona {
  id: string
  name: string
  description: string
  prompt: string
  tagline: string
  avatar : string
}