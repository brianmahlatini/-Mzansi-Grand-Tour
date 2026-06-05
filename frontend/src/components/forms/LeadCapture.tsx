// Purpose: Captures lightweight traveler intent and sends a typed lead payload
// to the backend PostgreSQL-backed conversion endpoint.
import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { submitLead } from "../../api/tourismApi";
import type { LeadPayload } from "../../types/tourism";

type FormStatus = "idle" | "loading" | "success" | "error";

function stringValue(form: FormData, key: keyof LeadPayload): string {
  return String(form.get(key) || "");
}

export function LeadCapture() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const payload: LeadPayload = {
      fullName: stringValue(form, "fullName"),
      email: stringValue(form, "email"),
      travelStyle: stringValue(form, "travelStyle"),
      dreamTrip: stringValue(form, "dreamTrip")
    };

    try {
      await submitLead(payload);
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <select name="travelStyle" defaultValue="safari-and-coast" required>
        <option value="safari-and-coast">Safari and coast</option>
        <option value="wine-and-culture">Wine and culture</option>
        <option value="family-adventure">Family adventure</option>
        <option value="honeymoon">Honeymoon</option>
      </select>
      <input name="dreamTrip" placeholder="Describe the trip you want in one sentence" required />
      <button type="submit" aria-label="Send trip idea">
        <Sparkles size={18} />
      </button>
      {status === "success" && <span>Sent</span>}
      {status === "error" && <span>Try again</span>}
    </form>
  );
}
