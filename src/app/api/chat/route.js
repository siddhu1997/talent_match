import { NextRequest } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "No message provided" }), {
      status: 400,
    });
  }

  const response = await fetch(process.env.PYTHON_CHAT_SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PYTHON_CHAT_SERVER_TOKEN}`,
    },
    body: JSON.stringify({ message }),
  });


  if (!response.ok || !response.body) {
    return new Response("Error connecting to chat server", { status: 502 });
  }

  // Stream the response from Python back to the client
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
