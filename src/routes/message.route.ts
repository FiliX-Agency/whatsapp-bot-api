import express from "express";
import multer from "multer";
import { MessageController } from "../controllers/index.js";

const routes = express.Router();

/**
 * @swagger
 * /messages/send:
 *  post:
 *      tags: [Messages]
 *      summary: Send message to groups or private chats
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/SendMessageDTO'
 *      responses:
 *          200:
 *              description: Message Sent successfuly
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  enum: [sent]
 *                              to:
 *                                  type: string
 */
routes.post("/send", multer().single("media"), MessageController.sendMessage);

export default routes;
