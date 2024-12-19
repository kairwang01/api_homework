export default function handler(req, res) {
  if (req.method === "POST") {
    const { image } = req.body;
    console.log("Received screenshot:", image);
    res.status(200).json({ status: "success", message: "Screenshot received" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
