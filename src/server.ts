// import { startBot } from "./bot.js";
import app from "./app.js";
import { createServer } from "http";
import { connectToDB } from "./db/index.js";
// import { initUserSession } from "./wa/userSession.js";

async function bootstrap() {
  // await startBot();
  await connectToDB();
  // const sock = await initUserSession("688f4a545c7669a3324a887f");
  // // await waitUntilConnected(sock!);
  // await sock?.sendMessage("989226734877@s.whatsapp.net", {
  //   text: "i see trees of green, red roses too, i see them bloom, for me and you, and i think to myself, WHAT A WONDERFUL WORLD!",
  // });
  const server = createServer(app);

  const port = 4000;
  server.listen(port, () => {
    console.log(`server is now running on http://localhost:4000`);
    console.log(`api docs are at http://localhost:4000/api-docs`);
  });
}

bootstrap();
