import express from "express";
import { AuthRoute, MessageRoute, GroupRoute } from "./routes/index.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger/index.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/messages", MessageRoute);
app.use("/auth", AuthRoute);
app.use("/groups", GroupRoute);

export default app;
