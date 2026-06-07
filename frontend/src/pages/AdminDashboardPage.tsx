// Purpose: Shows high-level administrator metrics, recent activity, and sales
// pipeline visibility across users, leads, bookings, and packages.
import { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/platformApi";
import type { AdminDashboardData } from "../types/tourism";

export function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardData | null>(null);

  useEffect(() => {
    getAdminDashboard().then(setData);
  }, []);

  if (!data) {
    return <div className="dashboard-card">Loading admin dashboard...</div>;
  }

  const metrics = [
    ["Users", data.metrics.users],
    ["Bookings", data.metrics.bookings],
    ["Cancellations", data.metrics.cancellations],
    ["Leads", data.metrics.leads],
    ["Packages", data.metrics.packages]
  ];

  return (
    <section className="dashboard-stack">
      <div className="metric-grid">
        {metrics.map(([label, value]) => (
          <article className="metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <div className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Recent bookings</h2>
          {data.recentBookings.map((booking) => (
            <div className="dashboard-row" key={booking.id}>
              <span>{booking.destination}</span>
              <strong>{booking.status}</strong>
            </div>
          ))}
        </article>
        <article className="dashboard-card">
          <h2>Booking status</h2>
          {data.bookingsByStatus.map((item) => (
            <div className="dashboard-row" key={item.status}>
              <span>{item.status}</span>
              <strong>{item.count}</strong>
            </div>
          ))}
        </article>
        <article className="dashboard-card">
          <h2>Recent users</h2>
          {data.recentUsers.map((item) => (
            <div className="dashboard-row" key={item.id}>
              <span>{item.username}</span>
              <strong>{item.role}</strong>
            </div>
          ))}
        </article>
        <article className="dashboard-card">
          <h2>Recent leads</h2>
          {data.recentLeads.map((lead) => (
            <div className="dashboard-row" key={lead.id}>
              <span>{lead.full_name}</span>
              <strong>{lead.travel_style}</strong>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
