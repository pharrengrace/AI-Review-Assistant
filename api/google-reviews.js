export const config = {
  runtime: "nodejs"
};

export default function handler(req, res) {
  return res.status(200).json({
    status: "OK",
    message: "API working",
    runtime: "nodejs-fixed",
    timestamp: Date.now()
  });
}