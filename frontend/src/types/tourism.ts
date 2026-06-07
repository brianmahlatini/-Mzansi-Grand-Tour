// Purpose: Defines shared frontend domain models so pages, forms, and API
// helpers use the same typed contract for tourism content and conversions.
export interface Destination {
  slug: string;
  name: string;
  province: string;
  tagline: string;
  description: string;
  image: string;
  video?: string;
  bestFor: string[];
  signatureMoments: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  season: string;
}

export interface Experience {
  title: string;
  category: string;
  region: string;
  duration: string;
  intensity: string;
  image: string;
  summary: string;
  inclusions: string[];
}

export interface Story {
  title: string;
  kicker: string;
  readTime: string;
  image: string;
  excerpt: string;
  author: string;
}

export interface JourneyPackage {
  slug: string;
  title: string;
  region: string;
  duration_days: number;
  price_from_usd: number;
  highlights: string[];
}

export interface LeadPayload {
  fullName: string;
  email: string;
  travelStyle: string;
  dreamTrip: string;
}

export interface BookingPayload {
  fullName: string;
  email: string;
  destination: string;
  guests: number;
  arrivalDate: string;
  budgetRange: string;
  notes: string;
}

export type UserRole = "ADMIN" | "USER";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: string;
  createdAt?: string;
  lastLoginAt?: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface BookingRecord {
  id: number;
  user_id?: number | null;
  username?: string | null;
  full_name: string;
  email: string;
  destination: string;
  guests: number;
  arrival_date: string;
  budget_range: string;
  notes: string | null;
  status: string;
  cancellation_reason?: string | null;
  cancelled_at?: string | null;
  created_at: string;
}

export interface LeadRecord {
  id: number;
  user_id?: number | null;
  full_name: string;
  email: string;
  travel_style: string;
  dream_trip: string;
  created_at: string;
}

export interface AuditEvent {
  id: number;
  user_id: number | null;
  username?: string | null;
  email?: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AdminDashboardData {
  metrics: {
    users: number;
    bookings: number;
    cancellations: number;
    leads: number;
    packages: number;
  };
  bookingsByStatus: Array<{ status: string; count: number }>;
  recentBookings: BookingRecord[];
  recentLeads: LeadRecord[];
  recentUsers: AuthUser[];
}

export interface UserDashboardData {
  user: AuthUser;
  bookings: BookingRecord[];
  leads: LeadRecord[];
  nextTrip: BookingRecord | null;
}

export interface TourismData {
  destinations: Destination[];
  experiences: Experience[];
  packages: JourneyPackage[];
  stories: Story[];
}
