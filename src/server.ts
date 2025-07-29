import { startBot } from "./bot";
import app from "./app";
import { createServer } from "http";

async function bootstrap() {
  await startBot();

  const server = createServer(app);

  const port = 4000;
  server.listen(port, () => {
    console.log(`server is now running on http://localhost:4000`);
  });
}

bootstrap();
