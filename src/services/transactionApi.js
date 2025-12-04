import { getAccessToken } from "./authApi";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* =======================================================
    GET TRANSAKSI USER SAJA
   ======================================================= */
export const getUserTransactions = async (userId) => {
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

  if (!res.ok) {
    console.error("Error getUserTransactions:", await res.text());
    throw new Error("Gagal mengambil riwayat transaksi.");
  }

  return await res.json();
};

/* =======================================================
    GET SEMUA TRANSAKSI (untuk PRODUK POPULER GLOBAL)
   ======================================================= */
export const getAllTransactions = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/transaction_history?select=*`,
    {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Error getAllTransactions:", await res.text());
    throw new Error("Gagal mengambil semua transaksi.");
  }

  return await res.json();
};

/* =======================================================
    CREATE TRANSACTION
   ======================================================= */
export const createTransaction = async (payload) => {
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

  if (!res.ok) {
    console.error("Error createTransaction:", await res.text());
    throw new Error("Gagal membuat transaksi.");
  }

  const data = await res.json();
  return data?.[0] || null;
};
