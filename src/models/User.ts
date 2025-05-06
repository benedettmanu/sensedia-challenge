export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  city?: string;
  weekdays?: string;
  posts_count?: number;
  albums_count?: number;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  users: User[];
}

export interface PostsResponse {
  posts: Post[];
}

export interface AlbumsResponse {
  albums: Album[];
}

export interface PaginatedUsers {
  users: User[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
