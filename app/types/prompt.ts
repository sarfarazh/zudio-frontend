export interface PromptRequest {
  seed: string
  custom?: string
  subject?: string
  artform?: string
  photo_type?: string
  body_types?: string[]
  default_tags?: string[]
  roles?: string[]
  hairstyles?: string[]
  additional_details?: string[]
  photography_styles?: string[]
  device?: string
  photographer?: string
  artist?: string
  digital_artform?: string
  place?: string
  lighting?: string
  clothing?: string[]
  composition?: string
  pose?: string
  background?: string
  enhance?: boolean
} 