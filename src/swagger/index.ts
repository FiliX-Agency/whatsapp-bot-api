import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Whatsapp bot api",
      version: "0.0.1",
      description: "Api Documentation for a whatsapp bot api",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: [
    // #region TS files
    path.join(dirName, "../routes/**/*.ts"),
    path.join(dirName, "./tags.ts"),
    path.join(dirName, "./components.ts"),
    //#endregion

    // #region JS files
    path.join(dirName, "../routes/**/*.js"),
    path.join(dirName, "./tags.js"),
    path.join(dirName, "./components.js"),
    //#endregion
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
