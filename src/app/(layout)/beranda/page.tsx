"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function Beranda() {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    let resultConfirm = confirm("Anda yakin akan keluar?");
    if (resultConfirm) {
      logout();
    }
  };

  return (
    <div>
      {user ? `Selamat Datang, ${user}!` : "Loading..."}
      <br />
      Beranda
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
