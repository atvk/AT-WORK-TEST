import type { User } from '../types/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  const data = await response.json();
  // Возвращаем только первых 6 пользователей
  return data.slice(0, 6);
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};