export default async function handler(req, res) {
  const { text } = req.body || {};

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  // Simple AI-style rewrite (we can upgrade to real OpenAI later)
  const improved = `The experience was excellent. ${text
    .replace("nice", "friendly and professional")
    .replace("good", "great")
  }`;

  return res.status(200).json({
    improved
  });
}