import { getAccessToken } from "./authApi";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function getProductsByCategory(category) {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("Tidak ada access token.");

  const baseUrl = `${SUPABASE_URL}/rest/v1/product`;

  const url =
    category && category !== "all"
      ? `${baseUrl}?category=eq.${encodeURIComponent(category)}&select=*`
      : `${baseUrl}?select=*`;

  const res = await fetch(url, {
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal mengambil produk: ${res.status} - ${text}`);
  }

  return res.json();
}
