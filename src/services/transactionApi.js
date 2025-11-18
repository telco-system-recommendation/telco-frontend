// src/services/transactionApi.js
import { getAccessToken } from "./authApi";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// GET /transaction_history?user_id=eq.<userId>
export async function getUserTransactions(userId) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/transaction_history?user_id=eq.${userId}&order=created_at.desc`,
    {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Gagal mengambil riwayat transaksi.");
  return await res.json();
}

// POST /transaction_history
export async function createTransaction(payload) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  const res = await fetch(`${SUPABASE_URL}/rest/v1/transaction_history`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal membuat transaksi.");
  const data = await res.json();
  return data[0] || null;
}
