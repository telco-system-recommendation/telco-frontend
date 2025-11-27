import { notifySessionChange } from "./sessionListener";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY belum diset. Tambahkan di file .env pada root project."
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

// LOGOUT — POST /auth/v1/logout
export async function logout() {
  const token = getAccessToken();
  if (!token) {
    clearSession();
    notifySessionChange(null);
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
  notifySessionChange(null);
}

/* =====================================================
   ================ SESSION HELPERS =====================
   ===================================================== */

export function saveSession(session) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  notifySessionChange(session);
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function getAccessToken() {
  return getSession()?.access_token ?? null;
}
