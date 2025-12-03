import { getAccessToken, getSession } from "./authApi";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const USER_BEHAVIOUR_URL = `${SUPABASE_URL}/rest/v1/user_behaviour`;

/* 1) SIMPAN USER BEHAVIOUR */
export async function saveUserBehaviour(payload) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  const res = await fetch(USER_BEHAVIOUR_URL, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 409) {
    console.warn("saveUserBehaviour: row sudah ada, lanjut saja.");
    return null;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal menyimpan user_behaviour: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

/* 2) CEK SUDAH PUNYA USER_BEHAVIOUR ATAU BELUM */
export async function hasUserBehaviour(userId, accessToken) {
  const token = accessToken || getAccessToken();
  if (!token || !userId) {
    console.warn("hasUserBehaviour: tidak ada token atau userId.");
    return false;
  }

  const url = `${USER_BEHAVIOUR_URL}?id=eq.${userId}&select=id&limit=1`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn(
        `Gagal cek user_behaviour: ${res.status} - ${text || "no body"}`
      );
      return false;
    }

    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch (err) {
    console.error("Error hasUserBehaviour:", err);
    return false;
  }
}

/* 3) INCREASE COMPLAIN COUNT  */
export async function increaseComplainCount() {
  const token = getAccessToken();
  const session = getSession();
  const userId = session?.user?.id;

  if (!token || !userId) throw new Error("Tidak ada token / user.");

  const getUrl = `${USER_BEHAVIOUR_URL}?id=eq.${userId}&select=complain_count`;

  const getRes = await fetch(getUrl, {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!getRes.ok) {
    const text = await getRes.text();
    throw new Error(
      `Gagal mengambil complain_count: ${getRes.status} - ${text}`
    );
  }

  const rows = await getRes.json();
  const current = rows[0]?.complain_count ?? 0;

  const patchUrl = `${USER_BEHAVIOUR_URL}?id=eq.${userId}`;

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
    throw new Error(
      `Gagal update complain_count: ${patchRes.status} - ${text}`
    );
  }

  const updated = await patchRes.json();
  return Array.isArray(updated) ? updated[0] : updated;
}
