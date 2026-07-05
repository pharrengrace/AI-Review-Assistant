export default function handler(req) {
  return Response.json({
    status: "OK",
    message: "API working",
    runtime: "vercel-edge-fixed",
    timestamp: Date.now()
  });
}