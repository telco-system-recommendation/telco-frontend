import { getAccessToken } from "./authApi";
import { increaseComplainCount } from "./userBehaviourApi";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const BASE_URL = `${SUPABASE_URL}/rest/v1/complaints`;

function getAuthHeaders(token, extra = {}) {
  return {
    apikey: ANON_KEY,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

// CREATE complaint + naikkan complain_count
export async function createComplaint({ title, category, priority, description }) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token");

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(token, {
      Prefer: "return=representation",
    }),
    body: JSON.stringify({
      title,
      category,
      priority,
      description,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal membuat komplain: ${res.status} - ${text}`);
  }

  const data = await res.json();
  const complaint = Array.isArray(data) ? data[0] : data;


  try {
    await increaseComplainCount();
  } catch (err) {
    console.error("Gagal update complain_count:", err);
  }

  return complaint;
}

export async function getMyComplaints() {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token");

  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal mengambil komplain: ${res.status} - ${text}`);
  }

  return res.json();
}

// OPTIONAL – kalau nanti mau dipakai untuk edit
export async function updateComplaint(id, payload) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token");

  const params = new URLSearchParams({
    id: `eq.${id}`,
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    method: "PATCH",
    headers: getAuthHeaders(token, {
      Prefer: "return=representation",
    }),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal update komplain: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

// OPTIONAL – kalau mau hapus
export async function deleteComplaint(id) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token");

  const params = new URLSearchParams({
    id: `eq.${id}`,
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    method: "DELETE",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal menghapus komplain: ${res.status} - ${text}`);
  }

  // 204 no content → tidak ada body
  return true;
}
