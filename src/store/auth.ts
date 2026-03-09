/**
 * Usuários demo para acesso à área do cliente e admin.
 * Use estas credenciais na tela de login.
 */

export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const DEMO_USERS: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'cliente@lumea.com',
    password: 'cliente123',
    user: {
      id: '1',
      name: 'Maria Silva',
      email: 'cliente@lumea.com',
      role: 'client',
    },
  },
  {
    email: 'admin@lumea.com',
    password: 'admin123',
    user: {
      id: '2',
      name: 'Admin Luméa',
      email: 'admin@lumea.com',
      role: 'admin',
    },
  },
];

const AUTH_STORAGE_KEY = 'lumea_auth';

export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null): void {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function loginDemo(email: string, password: string): User | null {
  const normalizedEmail = email.trim().toLowerCase();
  const found = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
  if (found) {
    setStoredUser(found.user);
    return found.user;
  }
  return null;
}

export function logout(): void {
  setStoredUser(null);
}
