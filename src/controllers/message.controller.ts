import { RequestHandler } from "express";
import { getMediaType } from "../lib/helpers.js";
import { MessageService } from "../services/index.js";

export const sendMessage: RequestHandler = async (req, res) => {
  const { number, text, caption } = req.body;
  const media = req.file;
  // if (!number || !message)
  //   return res.status(400).json({ error: "Missing number or message" });
  try {
    await MessageService.sendMessage(
      number,
      { text, media, caption },
      media ? getMediaType(media.mimetype) : "text"
    );
    res.json({ status: "sent", to: number });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
