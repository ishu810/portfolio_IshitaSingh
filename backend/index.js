// import express from "express";
// import fetch from "node-fetch";

// const app = express();

// app.get("/api/leetcode", async (req, res) => {
//   const { handle } = req.query;
//   const r = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
//   res.json(await r.json());
// });

// app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT||8000;

app.use(cors());

// Utility function to safely fetch JSON
async function safeFetchJSON(url) {
  try {
    const res = await fetch(url);
    const text = await res.text(); // get raw response text
    try {
      return JSON.parse(text); // attempt JSON parsing
    } catch {
      // If parsing fails, return error object
      return { error: "Invalid JSON from API", raw: text };
    }
  } catch (e) {
    return { error: e.message };
  }
}

// LeetCode
app.get("/api/leetcode", async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.json({ error: "Missing handle" });
  const data = await safeFetchJSON(`https://leetcode-stats-api.herokuapp.com/${handle}`);
  res.json(data);
});

// Codeforces
app.get("/api/codeforces", async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.json({ error: "Missing handle" });
  const data = await safeFetchJSON(`https://codeforces.com/api/user.info?handles=${handle}`);
  res.json(data);
});

// GFG
app.get("/api/gfg", async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.json({ error: "Missing handle" });
  const data = await safeFetchJSON(`https://geeks-for-geeks-stats-api.vercel.app/${handle}`);
  res.json(data);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));


// import express from "express";
// import fetch from "node-fetch";

// const app = express();

// app.get("/api/leetcode", async (req, res) => {
//   const { handle } = req.query;
//   const r = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
//   res.json(await r.json());
// });

// app.get("/api/codeforces", async (req, res) => {
//   const { handle } = req.query;
//   const r = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
//   res.json(await r.json());
// });

// app.get("/api/gfg", async (req, res) => {
//   const { handle } = req.query;
//   const r = await fetch(`https://geeks-for-geeks-stats-api.vercel.app/${handle}`);
//   res.json(await r.json());
// });

// app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
