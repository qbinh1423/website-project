const express = require("express");
const cartController = require("../controllers/cart.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();
const multer = require("multer");
const upload = multer();

module.exports.setup = (app) => {
  app.use("/api/cart", router);

  /**
   * @swagger
   *  /api/cart:
   *  post:
   *      summary: Add a product to the cart
   *      description: Adds a product to the cart or updates the quantity if the product is already in the cart.
   *      requestBody:
   *          required: true
   *          content:
   *              multipart/form-data:
   *                  schema:
   *                      $ref: '#/components/schemas/Carts'
   *      tags:
   *          - cart
   *      responses:
   *          201:
   *              description: Product added to cart successfully
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              status:
   *                                  type: string
   *                                  description: The response status
   *                                  enum: [success]
   *                              data:
   *                                  type: object
   *                                  properties:
   *                                      cart:
   *                                          $ref: '#/components/schemas/Carts'
   */
  router.post("/", upload.none(), cartController.createCart);

  /**
   * @swagger
   *  /api/cart/{u_name}:
   *    get:
   *      summary: Get products in the cart by user
   *      parameters:
   *          - in: path
   *            name: u_name
   *            schema:
   *              type: string
   *            description: Filter by user name
   *      tags:
   *        - cart
   *      responses:
   *        200:
   *          description: Successfully fetched cart items
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties:
   *                      cartItems:
   *                          type: array
   *                          items:
   *                              $ref: '#/components/schemas/Carts'
   *        404:
   *          description: No items found in the cart
   *        500:
   *          description: Internal Server Error
   */
  router.get("/:u_name", cartController.getCartByUser);

  /**
   * @swagger
   *  /api/cart/{cart_id}:
   *  put:
   *      summary: Update product quantity in the cart
   *      description: Updates the quantity of a product in the cart.
   *      parameters:
   *          - $ref: '#/components/parameters/cartIdParam'
   *      requestBody:
   *          required: true
   *          content:
   *              multipart/form-data:
   *                  schema:
   *                    $ref: '#/components/schemas/Carts'
   *
   *      tags:
   *          - cart
   *      responses:
   *          200:
   *              description: Product quantity updated successfully
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: object
   *                          properties:
   *                              status:
   *                                  type: string
   *                                  description: The response status
   *                                  enum: [success]
   *                              data:
   *                                  type: object
   *                                  properties:
   *                                      updatedCart:
   *                                        $ref: '#/components/schemas/Carts'
   */
  router.put("/:cart_id", upload.none(), cartController.updateCart);

  /**
   * @swagger
   *  /api/cart/{cart_id}:
   *      delete:
   *          summary: Delete cart by ID
   *          description: Delete cart by ID
   *          parameters:
   *              - $ref: '#/components/parameters/cartIdParam'
   *          tags:
   *              - cart
   *          responses:
   *              200:
   *                  description: Cart deleted
   *                  $ref: '#/components/responses/200NoData'
   */
  router.delete("/:cart_id", cartController.deleteCart);

  /**
   * @swagger
   * /api/cart:
   *   delete:
   *     summary: Delete all items in the cart
   *     description: Removes every item in the cart
   *     tags:
   *       - cart
   *     responses:
   *       200:
   *         description: All items in the cart deleted successfully
   *         $ref: '#/components/responses/200NoData'
   */
  router.delete("/", cartController.deleteAllCart);
  router.all("/", methodNotAllowed);
};
