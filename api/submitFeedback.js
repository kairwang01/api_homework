export default function handler(req, res) {
  if (req.method === "POST") {
    const { description, pageSource, currentUrl, userEmail } = req.body;
    console.log("Feedback received:", {
      description,
      pageSource,
      currentUrl,
      userEmail,
    });
    res.status(200).json({ status: "success", message: "Feedback submitted" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
