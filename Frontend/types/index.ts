// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  username?: string;
  bio?: string;
  createdAt: string;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  title?: string;
  description?: string;
  tags: string[];
  likes: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  isAiGenerated: boolean;
  createdAt: string;
}

// Draft Types
export interface Draft {
  id: string;
  userId: string;
  imageUrl: string;
  title?: string;
  description?: string;
  garments: Garment[];
  createdAt: string;
  updatedAt: string;
}

// Garment Types
export interface Garment {
  id: string;
  type: 'top' | 'bottom' | 'footwear' | 'accessory';
  imageUrl: string;
  productUrl?: string;
  name?: string;
}

// AI Generation Types
export interface AIGenerationRequest {
  userImage: string;
  garments: Garment[];
  styleParams?: StyleParams;
}

export interface StyleParams {
  style?: string;
  fit?: 'loose' | 'regular' | 'tight';
  occasion?: string;
}

export interface AIGenerationResponse {
  imageUrl: string;
  id: string;
  processingTime: number;
}

// Auth Types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}
