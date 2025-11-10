import { apiRequest } from './apiClient';
import { User } from '../types';

interface SignupResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}

export async function signup(fullName: string, email: string, password: string): Promise<User> {
  const result = await apiRequest<SignupResponse>('POST', '/api/auth/signup', {
    name: fullName,
    email,
    password,
  });

  return {
    id: String(result.id),
    name: result.name,
    email: result.email,
    role: result.role as 'admin' | 'user' | 'developer',
  };
}

export async function login(email: string, password: string): Promise<{ user: User; token?: string }> {
  const result = await apiRequest<LoginResponse>('POST', '/api/auth/login', { email, password });

  return {
    user: {
      id: String(result.user.id),
      name: result.user.name,
      email: result.user.email,
      role: result.user.role as 'admin' | 'user' | 'developer',
      token: result.token,
    },
    token: result.token,
  };
}
