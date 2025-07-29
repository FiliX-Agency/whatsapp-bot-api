import { getSock } from "../bot";

export async function sendMessage(jid: string, message: string) {
  const sock = getSock();
  if (!sock) throw new Error("Socket not connected");

  const formatted = jid.includes("@s.whatsapp.net")
    ? jid
    : jid + "@s.whatsapp.net";
  await sock.sendMessage(formatted, { text: message });
}
