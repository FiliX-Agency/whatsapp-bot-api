import express from "express";
import { getQR } from "./bot.js";
import { sendMessage } from "./handlers/sendMessage.js";
import { getGroups } from "./handlers/getGroups.js";
import { getChannels } from "./handlers/getChannels.js";
import multer from "multer";
import { getMediaType } from "./lib/helpers.js";
const app = express();
app.use(express.json());
app.get("/qr", (req, res) => {
    const qr = getQR();
    if (!qr)
        return res
            .status(404)
            .json({ message: "QR not available or already connected" });
    //   res.json({ qr });
    res.sendFile("./public/qr.png");
});
app.post("/send", multer().single("media"), async (req, res) => {
    const { number, text, caption } = req.body;
    const media = req.file;
    // if (!number || !message)
    //   return res.status(400).json({ error: "Missing number or message" });
    try {
        await sendMessage(number, { text, media, caption }, media ? getMediaType(media.mimetype) : "text");
        res.json({ status: "sent", to: number });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
app.get("/groups", async (req, res) => {
    try {
        const groups = await getGroups();
        res.status(200).json(groups);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
app.get("/channels", async (req, res) => {
    try {
        await getChannels();
        res.status(200).send("test");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "internal server error" });
    }
});
export default app;
