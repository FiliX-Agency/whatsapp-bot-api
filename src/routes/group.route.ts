import express from "express";
import { GroupController } from "../controllers/index.js";

const routes = express.Router();

/**
 * @swagger
 * /groups:
 *  get:
 *      summary: Get list of al groups
 *      tags: [Groups]
 *      responses: 
 *          200:
 *              description: Groups list
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Group'                      
 */
routes.get("/", GroupController.getGroups);

export default routes;
