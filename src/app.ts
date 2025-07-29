import express from "express";
import { getQR } from "./bot";
import { sendMessage } from "./handlers/sendMessage";

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

app.post("/send", async (req, res) => {
  const { number, message } = req.body;
  if (!number || !message)
    return res.status(400).json({ error: "Missing number or message" });

  try {
    await sendMessage(number, message);
    res.json({ status: "sent", to: number });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default app;
