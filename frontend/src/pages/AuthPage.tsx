// Purpose: Provides register/login screens where the first registered account
// becomes ADMIN and later accounts become USER through backend-controlled rules.
import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, UserPlus } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { PageHero } from "./PageHero";

type AuthMode = "login" | "register";

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("register");
  const [error, setError] = useState("");
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/account"} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const nextUser =
        mode === "register"
          ? await register({
              username: String(form.get("username") || ""),
              email: String(form.get("email") || ""),
              password: String(form.get("password") || "")
            })
          : await login({
              username: String(form.get("identifier") || ""),
              email: String(form.get("identifier") || "").includes("@") ? String(form.get("identifier")) : undefined,
              password: String(form.get("password") || "")
            });

      navigate(nextUser.role === "ADMIN" ? "/admin" : "/account");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Authentication failed");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Secure access"
        title="Traveler accounts and admin control."
        copy="The first registered account becomes the system admin. Every traveler after that receives a user dashboard for bookings and cancellations."
      />
      <main className="auth-page section-block">
        <form className="auth-panel" onSubmit={handleSubmit}>
          <div className="auth-tabs">
            <button type="button" className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
              <UserPlus size={17} />
              Register
            </button>
            <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
              <LockKeyhole size={17} />
              Login
            </button>
          </div>
          {mode === "register" ? (
            <>
              <label>
                Username
                <input name="username" placeholder="brian" required minLength={3} />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="you@example.com" required />
              </label>
            </>
          ) : (
            <label>
              Username or email
              <input name="identifier" placeholder="username or email" required />
            </label>
          )}
          <label>
            Password
            <input name="password" type="password" placeholder="Minimum 8 characters" required minLength={mode === "register" ? 8 : 1} />
          </label>
          <button className="primary-button" type="submit">
            {mode === "register" ? "Create account" : "Login"}
          </button>
          {error && <p className="form-status error">{error}</p>}
          <p className="auth-note">First account becomes ADMIN automatically. Later registrations become USER accounts.</p>
        </form>
      </main>
    </>
  );
}
