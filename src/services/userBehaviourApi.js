import { getAccessToken } from "./authApi";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Simpan / update (UPSERT) data user_behaviour
export async function saveUserBehaviour(payload) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  // upsert berdasarkan PRIMARY KEY (id)
  const url = `${SUPABASE_URL}/rest/v1/user_behaviour?on_conflict=id`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // resolution=merge-duplicates => kalau bentrok PK, di-UPDATE, bukan error 409
      Prefer: "return=representation,resolution=merge-duplicates",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Gagal menyimpan user_behaviour: ${res.status} - ${text}`
    );
  }

  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}
