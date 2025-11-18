// src/services/profilesApi.js
import { getAccessToken } from "./authApi";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// GET /profiles?id=eq.<user_id>
export async function getProfile(userId) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=*`,
    {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Gagal mengambil profil.");
  const data = await res.json();
  return data[0] || null;
}

// PATCH /profiles?id=eq.<user_id>
export async function updateProfile(userId, payload) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`,
    {
      method: "PATCH",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) throw new Error("Gagal mengupdate profil.");
  const data = await res.json();
  return data[0] || null;
}
