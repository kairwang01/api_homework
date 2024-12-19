export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (username === "test" && password === "123") {
      res.status(200).json({
        status: "success",
        user: {
          username: "test_测试用户",
          nickname: "Kair测试用户VIP至尊版",
          subscription_plan: 2,
          endtime: "2099-12-31",
        },
      });
    } else {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
