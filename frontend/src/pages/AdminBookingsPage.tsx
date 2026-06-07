// Purpose: Lets administrators inspect all booking requests and move each
// request through operational statuses.
import { ChangeEvent, useEffect, useState } from "react";
import { getAdminBookings, updateAdminBookingStatus } from "../api/platformApi";
import type { BookingRecord } from "../types/tourism";

const statuses = ["new", "reviewing", "confirmed", "completed", "cancelled"];

export function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    getAdminBookings().then(setBookings);
  }, []);

  async function handleStatusChange(booking: BookingRecord, event: ChangeEvent<HTMLSelectElement>) {
    const updated = await updateAdminBookingStatus(booking.id, event.target.value);
    setBookings((current) => current.map((item) => (item.id === updated.id ? updated : item)));
  }

  return (
    <section className="dashboard-card">
      <h2>All bookings</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Traveler</th>
              <th>Destination</th>
              <th>Guests</th>
              <th>Arrival</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.full_name}</td>
                <td>{booking.destination}</td>
                <td>{booking.guests}</td>
                <td>{booking.arrival_date?.slice(0, 10)}</td>
                <td>
                  <select value={booking.status} onChange={(event) => handleStatusChange(booking, event)}>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
