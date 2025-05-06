import config from '@/config';
import {
  Album,
  AlbumsResponse,
  Post,
  PostsResponse,
  User,
  UserResponse,
} from '@/models/User';

const API_BASE_URL = config.api.baseUrl;

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error('Falha ao buscar usuários');
    }

    const data: UserResponse = await response.json();
    return data.users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);

    if (!response.ok) {
      throw new Error(`Falha ao buscar posts para o usuário ${userId}`);
    }

    const data: PostsResponse = await response.json();
    return data.posts;
  } catch (error) {
    console.error(`Erro ao buscar posts para o usuário ${userId}:`, error);
    return [];
  }
}

export async function getUserAlbums(userId: string): Promise<Album[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/albums`);

    if (!response.ok) {
      throw new Error(`Falha ao buscar álbuns para o usuário ${userId}`);
    }

    const data: AlbumsResponse = await response.json();
    return data.albums;
  } catch (error) {
    console.error(`Erro ao buscar álbuns para o usuário ${userId}:`, error);
    return [];
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Falha ao excluir usuário ${userId}`);
    }

    return true;
  } catch (error) {
    console.error(`Erro ao excluir usuário ${userId}:`, error);
    return false;
  }
}
