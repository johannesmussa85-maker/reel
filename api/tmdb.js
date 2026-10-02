// Vercel serverless function: forwards allowed requests to TMDB using YOUR secret token.
// The token lives in the TMDB_TOKEN environment variable, never in the browser.
const ALLOWED = /^\/(trending\/movie\/(day|week)|search\/movie|discover\/movie|genre\/movie\/list|movie\/(popular|top_rated|now_playing|upcoming)|movie\/\d+(\/videos)?|person\/\d+)$/;

module.exports = async (req, res) => {
  try {
    const token = process.env.TMDB_TOKEN;
    if (!token) return res.status(500).json({ error: "TMDB_TOKEN is not set" });

    const query = req.query || {};
    const path = String(query.path || "");
    if (!ALLOWED.test(path)) return res.status(400).json({ error: "Path not allowed" });

    const url = new URL("https://api.themoviedb.org/3" + path);
    Object.keys(query).forEach((k) => {
      if (k !== "path") url.searchParams.set(k, String(query[k]));
    });
    if (!url.searchParams.has("language")) url.searchParams.set("language", "en-US");

    const r = await fetch(url, {
      headers: { Authorization: "Bearer " + token, accept: "application/json" },
    });
    const data = await r.json();
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=3600");
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(502).json({ error: "Could not reach TMDB" });
  }
};
