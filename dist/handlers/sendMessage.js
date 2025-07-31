import { getSock } from "../bot.js";
export async function sendMessage(jid, content, type) {
    const sock = getSock();
    if (!sock)
        throw new Error("Socket not connected");
    const formatted = jid.includes("@s.whatsapp.net") || jid.includes("@g.us")
        ? jid
        : jid + "@s.whatsapp.net";
    let messageContent;
    switch (type) {
        case "image":
            messageContent = {
                image: content.media.buffer,
                caption: content.caption,
            };
            break;
        case "audio":
            messageContent = {
                audio: content.media.buffer,
                caption: content.caption,
            };
            break;
        case "video":
            messageContent = {
                video: content.media.buffer,
                caption: content.caption,
            };
            break;
        case "document":
            messageContent = {
                document: content.media.buffer,
                mimetype: content.media.mimeType,
                fileName: content.media.originalname,
                caption: content.caption,
            };
            break;
        case "text":
        default:
            messageContent = {
                text: content.text,
            };
            break;
    }
    console.log(messageContent);
    await sock.sendMessage(formatted, messageContent);
}
