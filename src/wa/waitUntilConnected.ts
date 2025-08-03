import { WASocket } from "@whiskeysockets/baileys";

export async function waitUntilConnected(
  sock: WASocket,
  timeout = 10000
): Promise<void> {
  console.log(sock.user);
  if (sock.user) return; // already connected

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(
      () => reject(new Error("Timeout waiting for connection")),
      timeout
    );

    sock.ev.on("connection.update", ({ connection }) => {
      if (connection === "open") {
        clearTimeout(timeoutId);
        resolve();
      }
    });
  });
}
