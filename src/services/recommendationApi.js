// src/services/recommendationApi.js
import { getAccessToken } from "./authApi";
import { getProductsByIds } from "./productApi";

const SUPABASE_URL = "https://vledlplbztmprbgjwxie.supabase.co";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Endpoint table recommendations di Supabase
const RECOMMENDATIONS_URL = `${SUPABASE_URL}/rest/v1/recommendations`;

// Base URL API model
const MODEL_BASE_URL =
  import.meta.env.VITE_MODEL_API_URL || " http://54.196.76.81:3000";
const MODEL_RECOMMEND_URL = `${MODEL_BASE_URL}/recommend`;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function callModelRecommend({ userId, category, accessToken }) {
  try {
    const res = await fetch(MODEL_RECOMMEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        category,
        user_id: userId,
      }),
    });

    if (!res.ok) {
      console.warn(
        "Gagal panggil API model, status:",
        res.status,
        res.statusText
      );
      return null;
    }

    const json = await res.json();
    console.log("[Model] response:", json);

    if (json.status !== "success" || !json.data) {
      return null;
    }

    return json.data;
  } catch (err) {
    console.error("Error callModelRecommend:", err);
    return null;
  }
}

export async function getDashboardRecommendations({ userId, category }) {
  const accessToken = getAccessToken();

  if (!accessToken || !userId || !category) {
    console.warn("Param rekomendasi tidak lengkap", {
      hasToken: !!accessToken,
      userId,
      category,
    });
    return [];
  }

  let ids = null;

  // 1. Cek cache di tabel Supabase `recommendations`
  try {
    const params = new URLSearchParams({
      user_id: `eq.${userId}`,
      category: `eq.${category}`,
      select: "*",
      order: "created_at.desc",
      limit: "1",
    });

    const res = await fetch(`${RECOMMENDATIONS_URL}?${params.toString()}`, {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.warn(
        "Gagal fetch rekomendasi cache, status:",
        res.status,
        res.statusText
      );
    } else {
      const rows = await res.json();
      console.log("[Rekomendasi] rows dari Supabase:", rows);

      if (Array.isArray(rows) && rows.length > 0) {
        const row = rows[0];

        const createdAt = row.created_at
          ? new Date(row.created_at).getTime()
          : 0;
        const age = Date.now() - createdAt;

        const hasIds =
          Array.isArray(row.recommendations) && row.recommendations.length > 0;

        // Kalau masih < 24 jam dan ada ID → pakai sebagai cache
        if (hasIds && Number.isFinite(age) && age <= ONE_DAY_MS) {
          ids = row.recommendations;
        }
      }
    }
  } catch (err) {
    console.error("Error baca rekomendasi dari Supabase:", err);
  }

  // 2. Kalau cache kosong / kadaluarsa → panggil API model
  if (!Array.isArray(ids) || ids.length === 0) {
    console.log(
      "[Rekomendasi] Cache kosong / kadaluarsa, minta baru ke API model..."
    );

    const dataFromModel = await callModelRecommend({
      userId,
      category,
      accessToken,
    });

    if (!dataFromModel || !Array.isArray(dataFromModel.recommendations)) {
      return [];
    }

    ids = dataFromModel.recommendations;
    console.log("[Rekomendasi] IDs dari model:", ids);
  }

  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  // 3. Ambil detail produk dari tabel `product`
  try {
    const products = await getProductsByIds(ids);
    if (!Array.isArray(products)) return [];

    const map = new Map(products.map((p) => [p.product_id, p]));

    // Urutkan sesuai urutan rekomendasi dari model
    const final = ids
      .map((id) => map.get(id))
      .filter(Boolean)
      .map((prod) => ({
        product_id: prod.product_id,
        name: prod.name,
        description:
          prod.description ||
          prod.product_description ||
          "Rekomendasi berdasarkan perilaku penggunaan Anda.",
        price: Number(prod.price || 0),
      }));

    return final;
  } catch (err) {
    console.error("Gagal mengambil detail produk rekomendasi:", err);
    return [];
  }
}
