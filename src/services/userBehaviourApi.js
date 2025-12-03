import { getAccessToken, getSession } from "./authApi";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
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
    throw new Error(`Gagal menyimpan user_behaviour: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function increaseComplainCount() {
  const token = getAccessToken();
  const session = getSession();
  const userId = session?.user?.id;

  if (!token || !userId) throw new Error("Tidak ada token / user.");

  // 1. Ambil user_behaviour row user
  const getUrl = `${SUPABASE_URL}/rest/v1/user_behaviour?id=eq.${userId}&select=complain_count`;

  const getRes = await fetch(getUrl, {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  const rows = await getRes.json();
  const current = rows[0]?.complain_count ?? 0;

  // 2. Update complain_count + 1
  const patchUrl = `${SUPABASE_URL}/rest/v1/user_behaviour?id=eq.${userId}`;

  const patchRes = await fetch(patchUrl, {
    method: "PATCH",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      complain_count: current + 1,
    }),
  });

  if (!patchRes.ok) {
    const text = await patchRes.text();
    throw new Error(`Gagal update complain_count: ${patchRes.status} - ${text}`);
  }

  return (await patchRes.json())[0];
}