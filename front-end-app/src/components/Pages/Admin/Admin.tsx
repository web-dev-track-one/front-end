import React from "react";

const Admin = () => {
  return (
    <div className="admin-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#dashboard">Dashboard</a>
            </li>
            <li>
              <a href="#user-management">User Management</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <section id="dashboard">
          <h3>Dashboard</h3>
          <p>
            Welcome to the admin dashboard. Here you can find an overview of the
            site’s activity.
          </p>
        </section>
        <section id="user-management">
          <h3>User Management</h3>
          <p>Manage users here. Add, edit, or remove users.</p>
        </section>
        <section id="settings">
          <h3>Settings</h3>
          <p>Configure site settings here.</p>
        </section>
      </main>
    </div>
  );
};

export default Admin;
