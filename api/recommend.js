const MODEL_API_URL = "http://54.196.76.81:3000"; 

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { category, user_id } = req.body || {};

    const response = await fetch(`${MODEL_API_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, user_id }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy error to model API:", err);
    res.status(500).json({ error: "Failed to call model API" });
  }
}
