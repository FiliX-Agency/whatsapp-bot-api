/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "120363401599389589@g.us"
 *         addressingMode:
 *           type: string
 *           enum: [pn]
 *           example: "pn"
 *         subject:
 *           type: string
 *           example: "General"
 *         subjectOwner:
 *           type: string
 *           example: "989016371942@s.whatsapp.net"
 *         subjectTime:
 *           type: integer
 *           example: 1753888194
 *         size:
 *           type: integer
 *           example: 1
 *         creation:
 *           type: integer
 *           example: 1753888194
 *         owner:
 *           type: string
 *           example: "989016371942@s.whatsapp.net"
 *         desc:
 *           type: string
 *           example: "A group where community members can talk about anything with each other"
 *         descId:
 *           type: string
 *           example: "1"
 *         linkedParent:
 *           type: string
 *           example: "120363420797552495@g.us"
 *         restrict:
 *           type: boolean
 *           example: false
 *         announce:
 *           type: boolean
 *           example: false
 *         isCommunity:
 *           type: boolean
 *           example: false
 *         isCommunityAnnounce:
 *           type: boolean
 *           example: false
 *         joinApprovalMode:
 *           type: boolean
 *           example: false
 *         memberAddMode:
 *           type: boolean
 *           example: true
 *         participants:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "989016371942@s.whatsapp.net"
 *               admin:
 *                 type: string
 *                 nullable: true
 *                 example: "superadmin"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      SendMessageDTO:
 *          type: object
 *          required:
 *              - number
 *          properties:
 *              number:
 *                  type: string
 *                  example: 120363401599389589@g.us
 *              text:
 *                  type: string
 *                  example: Body of the message
 *              caption:
 *                  type: string
 *                  example: caption for the media
 *              media:
 *                  type: string
 *                  format: binary
 *      SignupDTO:
 *          type: object
 *          required:
 *              - username
 *              - password
 *              - passwordConfirm
 *          properties:
 *              username:
 *                  type: string
 *                  example: gunmaster
 *              name:
 *                  type: string
 *                  example: mohammad
 *              surname:
 *                  type: string
 *                  example: shekohi
 *              password:
 *                  type: string
 *                  example: pass123
 *              passwordConfirm:
 *                  type: string
 *                  example: pass123
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      SigninDTO:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  example: gunmaster
 *              password:
 *                  type: string
 *                  example: pass123
 */
