import { apiRequest } from './apiClient';

export interface AdminUserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  analyses: number;
  lastLogin: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  role: string;
  password?: string;
}

export async function listUsers(token?: string): Promise<AdminUserItem[]> {
  return apiRequest<AdminUserItem[]>('GET', '/api/users', undefined, token);
}

export async function createUser(data: CreateUserRequest, token?: string): Promise<void> {
  await apiRequest<void>('POST', '/api/users', data, token);
}

export async function updateUser(
  id: number,
  data: UpdateUserRequest,
  token?: string
): Promise<void> {
  await apiRequest<void>('PUT', `/api/users/${id}`, data, token);
}

export async function deleteUser(id: number, token?: string): Promise<void> {
  await apiRequest<void>('DELETE', `/api/users/${id}`, undefined, token);
}
