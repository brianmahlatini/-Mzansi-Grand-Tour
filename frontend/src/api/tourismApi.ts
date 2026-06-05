// Purpose: Wraps frontend API calls and falls back to bundled data when the
// backend is not yet available during design previews.
import { fallbackDestinations, fallbackExperiences, fallbackPackages, fallbackStories } from "../data/fallbackData";
import type { BookingPayload, Destination, Experience, JourneyPackage, LeadPayload, Story } from "../types/tourism";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiListResponse<T> {
  data: T;
}

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as ApiListResponse<T>;
    return payload.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown request error";
    console.warn(`Using fallback data for ${path}:`, message);
    return fallback;
  }
}

export function getDestinations(): Promise<Destination[]> {
  return fetchJson("/destinations", fallbackDestinations);
}

export function getExperiences(): Promise<Experience[]> {
  return fetchJson("/experiences", fallbackExperiences);
}

export function getStories(): Promise<Story[]> {
  return fetchJson("/stories", fallbackStories);
}

export function getPackages(): Promise<JourneyPackage[]> {
  return fetchJson("/packages", fallbackPackages);
}

export async function submitLead(payload: LeadPayload): Promise<ApiListResponse<unknown>> {
  const response = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Lead submission failed");
  }

  return response.json();
}

export async function submitBooking(payload: BookingPayload): Promise<ApiListResponse<unknown>> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Booking submission failed");
  }

  return response.json();
}
