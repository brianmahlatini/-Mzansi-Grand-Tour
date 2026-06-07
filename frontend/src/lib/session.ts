// Purpose: Persists the authenticated user session in browser storage so route
// guards and API helpers can survive page refreshes during development demos.
import type { AuthUser } from "../types/tourism";

const tokenKey = "mzansi_auth_token";
const userKey = "mzansi_auth_user";

export function getStoredToken(): string | null {
  return localStorage.getItem(tokenKey);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(userKey);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function storeSession(token: string, user: AuthUser): void {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}
