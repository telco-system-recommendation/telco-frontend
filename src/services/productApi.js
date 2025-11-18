// src/services/productApi.js
import { getAccessToken } from "./authApi";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// GET /product?category=eq.<category>
export async function getProductsByCategory(category) {
  const token = getAccessToken();
  if (!token) throw new Error("Tidak ada access token.");

  // kalau category null → ambil semua
  const url =
    category && category !== "Semua Produk"
      ? `${SUPABASE_URL}/rest/v1/product?category=eq.${encodeURIComponent(
          category
        )}&select=*`
      : `${SUPABASE_URL}/rest/v1/product?select=*`;

  const res = await fetch(url, {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal mengambil produk.");
  return await res.json();
}
