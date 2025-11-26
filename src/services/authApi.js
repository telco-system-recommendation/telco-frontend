import { notifySessionChange } from "./sessionListener";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  console.warn(
    "VITE_SUPABASE_ANON_KEY belum diset. Tambahkan di file .env pada root project."
  );
}

const AUTH_BASE_URL = `${SUPABASE_URL}/auth/v1`;
const SESSION_STORAGE_KEY = "telcoreco_session";

async function handleResponse(response) {
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }

  if (!response.ok) {
    const message =
      data?.msg ||
      data?.message ||
      data?.error_description ||
      data?.error ||
      response.statusText ||
      "Terjadi kesalahan saat memproses permintaan.";

    throw new Error(message);
  }

  return data;
}

/* =====================================================
   ================ AUTH ENDPOINTS ======================
   ===================================================== */

// LOGIN — POST /auth/v1/token?grant_type=password
export async function login({ email, password }) {
  const res = await fetch(`${AUTH_BASE_URL}/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const session = await handleResponse(res);

  saveSession(session);

  return session;
}

// SIGNUP — POST /auth/v1/signup
export async function signup({ email, password }) {
  const res = await fetch(`${AUTH_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

// RESET PASSWORD VIA EMAIL (LUPA PASSWORD)
export async function resetPassword({ email }) {
  const res = await fetch(`${AUTH_BASE_URL}/recover`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  // Supabase biasanya balikin body kosong, tapi handleResponse kita sudah aman
  await handleResponse(res);
  return true;
}


// UPDATE PASSWORD
export async function updatePassword({ email, newPassword }) {
  const res = await fetch(`${AUTH_BASE_URL}/user`, {
    method: "PUT",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: newPassword,
    }),
  });

  const data = await handleResponse(res);
  return data;
}


// LOGOUT — POST /auth/v1/logout
export async function logout() {
  const token = getAccessToken();

  // kalau sudah tidak ada token, cukup clear local state
  if (!token) {
    clearSession();
    return;
  }

  const res = await fetch(`${AUTH_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.warn("Logout gagal:", await res.text());
  }

  clearSession();
}


/* =====================================================
   ================ SESSION HELPERS =====================
   ===================================================== */

const SESSION_KEY = "telcoreco_session";

// Simpan session di sessionStorage (hilang kalau browser/tab ditutup)
export function saveSession(session) {
  if (typeof window === "undefined" || !session) return;

  const payload = { ...session };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));

  // beritahu listener navbar, dsb.
  notifySessionChange(payload);
}

// Bersihkan session (dipakai saat logout / token expired)
export function clearSession() {
  if (typeof window === "undefined") return;

  // hapus dari sessionStorage
  sessionStorage.removeItem(SESSION_KEY);

  // bersihkan sisa lama di localStorage kalau masih ada
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    // abaikan error localStorage
  }

  notifySessionChange(null);
}

// Ambil session aktif
export function getSession() {
  if (typeof window === "undefined") return null;

  // MIGRASI SEKALI: kalau dulu sempat nyimpan di localStorage, hapus
  try {
    if (localStorage.getItem(SESSION_KEY) && !sessionStorage.getItem(SESSION_KEY)) {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    // abaikan error
  }

  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw);

    // AUTO LOGOUT kalau token sudah kadaluarsa
    const nowSec = Math.floor(Date.now() / 1000);
    if (session.expires_at && nowSec >= session.expires_at) {
      clearSession();
      return null;
    }

    return session;
  } catch (e) {
    clearSession();
    return null;
  }
}

// Ambil access token dari session
export function getAccessToken() {
  return getSession()?.access_token ?? null;
}


