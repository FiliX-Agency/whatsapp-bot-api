import express from "express";
import { AuthController } from "../controllers/index.js";

const routes = express.Router();

/**
 * @swagger
 * /auth/qr:
 *  get:
 *      tags: [Auth]
 *      summary: gets authentication qrcode in binary format
 *      responses:
 *          200:
 *              description: qrcode successfuly sent
 *              content:
 *                  image/png:
 *                      type: string
 *                      format: binary
 */
routes.get("/qr", AuthController.getAuthQR);

export default routes;
