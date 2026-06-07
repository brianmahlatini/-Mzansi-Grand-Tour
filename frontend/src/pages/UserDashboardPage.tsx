// Purpose: Provides the traveler account panel for owned bookings, next-trip
// visibility, and self-service cancellation.
import { FormEvent, useEffect, useState } from "react";
import { cancelUserBooking, getUserDashboard } from "../api/platformApi";
import type { UserDashboardData } from "../types/tourism";

export function UserDashboardPage() {
  const [data, setData] = useState<UserDashboardData | null>(null);
  const [activeCancelId, setActiveCancelId] = useState<number | null>(null);

  useEffect(() => {
    getUserDashboard().then(setData);
  }, []);

  async function handleCancel(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const updated = await cancelUserBooking(id, String(form.get("reason") || ""));
    setData((current) =>
      current
        ? { ...current, bookings: current.bookings.map((booking) => (booking.id === updated.id ? updated : booking)) }
        : current
    );
    setActiveCancelId(null);
  }

  if (!data) {
    return <div className="dashboard-card">Loading your trips...</div>;
  }

  return (
    <section className="dashboard-stack">
      <article className="dashboard-card hero-dashboard-card">
        <p className="eyebrow">Next trip</p>
        <h2>{data.nextTrip ? data.nextTrip.destination : "No active trip yet"}</h2>
        <p>
          {data.nextTrip
            ? `${data.nextTrip.guests} guests arriving ${data.nextTrip.arrival_date.slice(0, 10)}`
            : "Start a booking request from the planning page and it will appear here."}
        </p>
      </article>
      <article className="dashboard-card">
        <h2>My bookings</h2>
        {data.bookings.map((booking) => (
          <div className="booking-panel" key={booking.id}>
            <div>
              <strong>{booking.destination}</strong>
              <span>
                {booking.arrival_date.slice(0, 10)} · {booking.guests} guests · {booking.status}
              </span>
            </div>
            {booking.status !== "cancelled" && (
              <button type="button" onClick={() => setActiveCancelId(booking.id)}>
                Cancel
              </button>
            )}
            {activeCancelId === booking.id && (
              <form className="cancel-form" onSubmit={(event) => handleCancel(event, booking.id)}>
                <input name="reason" placeholder="Reason for cancellation" required minLength={5} />
                <button className="primary-button" type="submit">
                  Confirm cancellation
                </button>
              </form>
            )}
          </div>
        ))}
      </article>
    </section>
  );
}
