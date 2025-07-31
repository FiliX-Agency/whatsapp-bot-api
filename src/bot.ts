import {
  makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  WASocket,
} from "@whiskeysockets/baileys";
import QRCode from "qrcode";
import fs from "fs";

let sock: WASocket | null = null;
let qrImage: string | null = null;

export const getSock = () => sock;
export const getQR = () => qrImage;

export async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const { version } = await fetchLatestBaileysVersion();
  sock = makeWASocket({
    version,
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { qr, connection, lastDisconnect } = update;

    if (qr) {
      qrImage = await QRCode.toDataURL(qr);

      const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      fs.writeFileSync("./public/qr.png", buffer);
    }

    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as any)?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        await startBot();
      }
    } else if (connection === "open") {
      qrImage = null;
      if (fs.existsSync("./public/qr.png")) fs.unlinkSync("./public/qr.png");
    }
  });
}
