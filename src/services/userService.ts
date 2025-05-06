import { PaginatedUsers, User } from '@/models/User';
import { getUsers, getUserPosts, getUserAlbums, deleteUser } from './api';
import { enrichUserData } from './randomData';

const PAGE_SIZE = 5;

export async function fetchEnrichedUsers(): Promise<User[]> {
  const users = await getUsers();
  const enrichedUsers = enrichUserData(users);

  const usersWithCounts = await Promise.all(
    enrichedUsers.map(async (user) => {
      const posts = await getUserPosts(user.id);
      const albums = await getUserAlbums(user.id);

      return {
        ...user,
        posts_count: posts?.length | 0,
        albums_count: albums?.length | 0,
      };
    })
  );

  return usersWithCounts;
}

export async function getPaginatedUsers(
  page: number = 1,
  search: string = ''
): Promise<PaginatedUsers> {
  const allUsers = await fetchEnrichedUsers();

  const filteredUsers = search
    ? allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.id.toLowerCase().includes(search.toLowerCase())
      )
    : allUsers;

  const totalCount = filteredUsers.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return {
    users: paginatedUsers,
    totalCount,
    currentPage,
    totalPages,
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await fetchEnrichedUsers();
  return users.find((user) => user.id === id) || null;
}

export async function deleteUserById(id: string): Promise<boolean> {
  try {
    const user = await getUserById(id);

    if (!user) {
      return false;
    }

    return await deleteUser(id);
  } catch (error) {
    console.error(`Erro ao excluir usuário ${id}:`, error);
    return false;
  }
}
