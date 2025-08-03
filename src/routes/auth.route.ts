import express from "express";
import { AuthController } from "../controllers/index.js";

const routes = express.Router();

/**
 * @swagger
 * /auth/qr:
 *  get:
 *      security:
 *          - bearerAuth: []
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

/**
 * @swagger
 * /auth/signup:
 *  post:
 *      tags: [Auth]
 *      summary: user signup
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SignupDTO'
 */
routes.post("/signup", AuthController.signup);

/**
 * @swagger
 * /auth/signin:
 *  post:
 *      tags: [Auth]
 *      summary: user signin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SigninDTO'
 */
routes.post("/signin", AuthController.signin);

export default routes;
