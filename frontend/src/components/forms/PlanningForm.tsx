// Purpose: Captures detailed trip planning requests and sends typed booking
// intent to the backend PostgreSQL booking endpoint.
import { FormEvent, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { submitBooking } from "../../api/tourismApi";
import type { BookingPayload, Destination } from "../../types/tourism";

type FormStatus = "idle" | "loading" | "success" | "error";

function readString(form: FormData, key: keyof BookingPayload): string {
  return String(form.get(key) || "");
}

export function PlanningForm({ destinations }: { destinations: Destination[] }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const destinationOptions = useMemo(() => destinations.map((item) => item.name), [destinations]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const payload: BookingPayload = {
      fullName: readString(form, "fullName"),
      email: readString(form, "email"),
      destination: readString(form, "destination"),
      guests: Number(form.get("guests") || 1),
      arrivalDate: readString(form, "arrivalDate"),
      budgetRange: readString(form, "budgetRange"),
      notes: readString(form, "notes")
    };

    try {
      await submitBooking(payload);
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="planning-form" onSubmit={handleSubmit}>
      <label>
        Full name
        <input name="fullName" placeholder="Your name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="you@example.com" required />
      </label>
      <label>
        Destination focus
        <select name="destination" required defaultValue="">
          <option value="" disabled>
            Choose a focus
          </option>
          {destinationOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Guests
        <input name="guests" type="number" min="1" max="30" defaultValue="2" required />
      </label>
      <label>
        Arrival date
        <input name="arrivalDate" type="date" required />
      </label>
      <label>
        Budget range
        <select name="budgetRange" required defaultValue="premium">
          <option value="premium">Premium: $2,000-$4,000 pp</option>
          <option value="luxury">Luxury: $4,000-$8,000 pp</option>
          <option value="ultra">Ultra-luxury: $8,000+ pp</option>
        </select>
      </label>
      <label className="wide-field">
        Notes
        <textarea name="notes" placeholder="Safari, wine, beaches, culture, family needs, honeymoon energy..." />
      </label>
      <button className="primary-button wide-field" type="submit" disabled={status === "loading"}>
        <CalendarDays size={18} />
        {status === "loading" ? "Sending..." : "Request a proposal"}
      </button>
      {status === "success" && <p className="form-status success">Request received. The travel team has the details.</p>}
      {status === "error" && <p className="form-status error">The request could not be sent yet. Please try again.</p>}
    </form>
  );
}
