export interface ApiConfig {
  title: string
  params: string[]
  message?: string
}

export interface CategoryType {
  id: string
  title: string
  apis: Record<string, ApiConfig>
}
