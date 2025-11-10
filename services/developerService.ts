import { apiRequest } from './apiClient';
import { User } from '../types';

interface DeveloperLoginResponse {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    token?: string;
}

export async function developerLogin(email: string, password: string): Promise<{ user: User; token?: string }> {
    const result = await apiRequest<DeveloperLoginResponse>('POST', '/api/developer/login', { email, password });

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