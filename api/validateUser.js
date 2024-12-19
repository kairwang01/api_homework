export default function handler(req, res) {
  if (req.method === "POST") {
    const { username } = req.body;
    if (username === "test_user") {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
