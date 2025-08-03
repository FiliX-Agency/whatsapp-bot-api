// import { startBot } from "./bot.js";
import app from "./app.js";
import { createServer } from "http";
import { connectToDB } from "./db/index.js";
import { initUserSession } from "./wa/userSession.js";

async function bootstrap() {
  // await startBot();
  await connectToDB();
  await initUserSession("688f4a545c7669a3324a887f");
  const server = createServer(app);

  const port = 4000;
  server.listen(port, () => {
    console.log(`server is now running on http://localhost:4000`);
    console.log(`api docs are at http://localhost:4000/api-docs`);
  });
}

bootstrap();
