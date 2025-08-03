import {
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeWASocket,
  WASocket,
} from "@whiskeysockets/baileys";
import { authStore } from "./authStore.js";
import { WASession } from "../models/index.js";
import QRCode from "qrcode";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const activeSockets = new Map<string, WASocket>();

export async function initUserSession(userId: string) {
  const { state, saveCreds } = await authStore(userId);
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);

  // sock.ev.on(
  //   "connection.update",
  //   async ({ connection, lastDisconnect, qr }) => {
  //     if (qr) {
  //       const qrImage = await QRCode.toDataURL(qr);

  //       const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
  //       const buffer = Buffer.from(base64Data, "base64");
  //       const qrCodePath = path.join(
  //         dirname,
  //         `../../private/qr-codes/${crypto.randomUUID()}.png`
  //       );

  //       if (!fs.existsSync(path.dirname(qrCodePath))) {
  //         fs.mkdirSync(path.dirname(qrCodePath), { recursive: true });
  //       }

  //       fs.writeFileSync(qrCodePath, buffer);

  //       const relativeQRCodePath = path.relative(
  //         path.join(dirname, "../../"),
  //         qrCodePath
  //       );

  //       await WASession.updateOne(
  //         { userId },
  //         { $set: { "qr.url": relativeQRCodePath } },
  //         { upsert: true }
  //       );
  //     }
  //     if (connection === "close") {
  //       const shouldReconnect =
  //         (lastDisconnect?.error as any)?.output?.statusCode !==
  //         DisconnectReason.loggedOut;

  //       if (shouldReconnect) {
  //         console.log("reconnecting.");
  //         await initUserSession(userId);
  //       } else {
  //         activeSockets.delete(userId);
  //       }
  //     } else if (connection === "open") {
  //       const session = await WASession.findOne({ userId });
  //       if (session?.qr?.url) {
  //         const qrCodePath = path.join(dirname, session.qr.url);

  //         fs.unlinkSync(qrCodePath);
  //       }
  //     }
  //   }
  // );

  const isConnected = new Promise<WASocket>((resolve, reject) => {
    let isResolved = false;

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
      if (connection === "open" && !isResolved) {
        isResolved = true;
        activeSockets.set(userId, sock);
        resolve(sock);
      }

      if (connection === "close" && !isResolved) {
        const reason = (lastDisconnect?.error as any)?.output?.statusCode;
        if (reason !== DisconnectReason.loggedOut) {
          console.log("Trying reconnect...");
          initUserSession(userId).then(resolve).catch(reject);
        } else {
          reject(new Error("Session logged out"));
        }
      }
    });
  });

  return isConnected;

  // if (activeSockets.has(userId)) return activeSockets.get(userId);
  // activeSockets.set(userId, sock);
  // return sock;
}
