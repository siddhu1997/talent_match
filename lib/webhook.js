export async function triggerWebhook(eventType, payload) {
  const url = process.env.PYTHON_WEBHOOK_ENDPOINT;
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: eventType, ...payload }),
    });
  } catch (err) {
    console.error("Webhook failed:", err.message);
  }
}
