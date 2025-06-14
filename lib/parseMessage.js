// lib/parseMessage.js
export function parseMessage(message) {
  const regex = /:::emp-cards\[(.*?)\]:::/g;
  const parts = [];
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(message)) !== null) {
    const fullMatch = match[0];
    const idsString = match[1];
    const empIDs = idsString.split(",").map((id) => id.trim());

    // Text before this match
    if (match.index > lastIndex) {
      parts.push(message.slice(lastIndex, match.index));
    }

    // Inject card instruction
    parts.push({ empIDs });

    lastIndex = match.index + fullMatch.length;
  }

  // Tail text after last match
  if (lastIndex < message.length) {
    parts.push(message.slice(lastIndex));
  }

  console.log("Parsed parts:", parts);
  return parts.length ? parts : [message]; // fallback if nothing matched
}
