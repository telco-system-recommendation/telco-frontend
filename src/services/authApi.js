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


export async function resetPassword({ email }) {
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/reset-password-confirm`
      : undefined;

  const body = {
    email,
    ...(redirectTo ? { redirect_to: redirectTo } : {}),
  };

  const res = await fetch(`${AUTH_BASE_URL}/recover`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  await handleResponse(res);
  return true;
}


// RESET PASSWORD MENGGUNAKAN ACCESS TOKEN DARI LINK EMAIL
export async function resetPasswordWithToken({ accessToken, newPassword }) {
  if (!accessToken) {
    throw new Error("Token reset password tidak ditemukan.");
  }

  const res = await fetch(`${AUTH_BASE_URL}/user`, {
    method: "PUT",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: newPassword,
    }),
  });

  return handleResponse(res);
}



// UPDATE PASSWORD
export async function updatePassword(newPassword) {
  const session = getSession();

  const token =
    session?.access_token ||
    session?.accessToken ||
    session?.session?.access_token;

  if (!token) {
    throw new Error(
      "Token login tidak ditemukan. Silakan logout lalu login ulang sebelum mengubah password."
    );
  }

  const res = await fetch(`${AUTH_BASE_URL}/user`, {
    method: "PUT",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword }),
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

// Simpan session ke sessionStorage + localStorage
export function saveSession(session) {
  if (typeof window === "undefined" || !session) return;

  const payload = { ...session };
  const serialized = JSON.stringify(payload);

  // per-tab (dipakai app di runtime)
  sessionStorage.setItem(SESSION_KEY, serialized);

  // lintas-tab (biar open link in new tab tetap login)
  try {
    localStorage.setItem(SESSION_KEY, serialized);
  } catch (e) {
    // ignore kalau private mode / quota penuh
  }

  notifySessionChange(payload);
}

export function clearSession() {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(SESSION_KEY);

  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {}

  notifySessionChange(null);
}

export function getSession() {
  if (typeof window === "undefined") return null;

  let raw = sessionStorage.getItem(SESSION_KEY);

  // Tab baru: sessionStorage kosong tapi localStorage masih ada
  if (!raw) {
    try {
      const localRaw = localStorage.getItem(SESSION_KEY);
      if (localRaw) {
        sessionStorage.setItem(SESSION_KEY, localRaw);
        raw = localRaw;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  if (!raw) return null;

  try {
    const session = JSON.parse(raw);

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

export function getAccessToken() {
  return getSession()?.access_token ?? null;
}
