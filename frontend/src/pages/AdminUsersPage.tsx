// Purpose: Gives administrators visibility into recent registered users and
// explains role ownership for the first-admin access model.
import { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/platformApi";
import type { AuthUser } from "../types/tourism";

export function AdminUsersPage() {
  const [users, setUsers] = useState<AuthUser[]>([]);

  useEffect(() => {
    getAdminDashboard().then((data) => setUsers(data.recentUsers));
  }, []);

  return (
    <section className="dashboard-card">
      <h2>User access</h2>
      <p>First registered account is the system administrator. Later accounts become traveler users.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
