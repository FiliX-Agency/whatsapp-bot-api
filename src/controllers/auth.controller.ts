import { RequestHandler } from "express";
import { getQR } from "../bot.js";

export const getAuthQR: RequestHandler = (req, res) => {
  const qr = getQR();
  if (!qr)
    return res
      .status(404)
      .json({ message: "QR not available or already connected" });
  //   res.json({ qr });
  res.sendFile("./public/qr.png");
};