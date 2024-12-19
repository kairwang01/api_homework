export default function handler(req, res) {
  res.status(200).json({
    version: "1.0.1",
    announcement: "Welcome to the new version!",
  });
}
