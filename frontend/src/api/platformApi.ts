// Purpose: Provides typed authenticated API helpers for registration, login,
// admin dashboards, user dashboards, booking status updates, and cancellations.
import { clearSession, getStoredToken, storeSession } from "../lib/session";
import type { AdminDashboardData, AuthResponse, AuthUser, BookingRecord, UserDashboardData } from "../types/tourism";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
  data: T;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const error = (await response.json().catch(() => ({ message: "Request failed" }))) as { message?: string };
    throw new Error(error.message || "Request failed");
  }

  const payload = (await response.json()) as ApiResponse<T>;
  return payload.data;
}

export async function registerUser(payload: { username: string; email: string; password: string }): Promise<AuthResponse> {
  const data = await request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  storeSession(data.token, data.user);
  return data;
}

export async function loginUser(payload: { username?: string; email?: string; password: string }): Promise<AuthResponse> {
  const data = await request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  storeSession(data.token, data.user);
  return data;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const data = await request<{ user: AuthUser }>("/auth/me");
  return data.user;
}

export async function getUserDashboard(): Promise<UserDashboardData> {
  return request<UserDashboardData>("/me/dashboard");
}

export async function cancelUserBooking(id: number, reason: string): Promise<BookingRecord> {
  return request<BookingRecord>(`/me/bookings/${id}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({ reason })
  });
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  return request<AdminDashboardData>("/admin/dashboard");
}

export async function getAdminBookings(): Promise<BookingRecord[]> {
  return request<BookingRecord[]>("/admin/bookings");
}

export async function updateAdminBookingStatus(id: number, status: string): Promise<BookingRecord> {
  return request<BookingRecord>(`/admin/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
}

export function logoutUser(): void {
  clearSession();
}
