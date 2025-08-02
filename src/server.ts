import { startBot } from "./bot.js";
import app from "./app.js";
import { createServer } from "http";

async function bootstrap() {
  await startBot();

  const server = createServer(app);

  const port = 4000;
  server.listen(port, () => {
    console.log(`server is now running on http://localhost:4000`);
    console.log(`api docs are at http://localhost:4000/api-docs`);
  });
}

bootstrap();
