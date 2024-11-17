const express = require("express");
const orderController = require("../controllers/orders.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();

module.exports.setup = (app) => {
  app.use("/api/orders", router);

  /**
   * @swagger
   *  /api/orders:
   *  post:
   *      summary: Place a new order
   *      description: Places a new order with shipping details and product list
   *      requestBody:
   *          required: true
   *          content:
   *              multipart/form-data:
   *                  schema:
   *                      $ref: '#/components/schemas/Orders'
   *      tags:
   *          - orders
   *      responses:
   *          201:
   *              description: Order placed successfully
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
   *                                      order:
   *                                          $ref: '#/components/schemas/Orders'
   */
  router.post("/", upload.none(), orderController.createdOrder);

  /**
   * @swagger
   *  /api/orders/details:
   *      get:
   *          summary: Get all order details
   *          description: Places a new order with shipping details and product list
   *          parameters:
   *              - $ref: '#/components/parameters/limitParam'
   *              - $ref: '#/components/parameters/pageParam'
   *          tags:
   *              - orders
   *          responses:
   *              200:
   *                  description: Order details retrieved successfully
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: object
   *                              properties:
   *                                  status:
   *                                      type: string
   *                                      enum: [success]
   *                                  data:
   *                                      type: array
   *                                      items:
   *                                          $ref: '#/components/schemas/Orders'
   *
   */
  router.get("/details", orderController.getAllOrders);

  /**
   * @swagger
   *  /api/orders/details/{o_id}:
   *      get:
   *          summary: Get order details
   *          description: Places a new order with shipping details and product list
   *          parameters:
   *              - $ref: '#/components/parameters/orderIdParam'
   *          tags:
   *              - orders
   *          responses:
   *              200:
   *                  description: Order details retrieved successfully
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: object
   *                              properties:
   *                                  status:
   *                                      type: string
   *                                      enum: [success]
   *                                  data:
   *                                      type: array
   *                                      items:
   *                                          $ref: '#/components/schemas/Orders'
   *
   */
  router.get("/details/:o_id", orderController.getOrderDetails);

  /**
   * @swagger
   *  /api/orders/{o_id}:
   *      delete:
   *          summary: Delete an order
   *          description: Deletes an order and its associated details
   *          parameters:
   *              - $ref: '#/components/parameters/orderIdParam'
   *          tags:
   *              - orders
   *          responses:
   *              200:
   *                  description: Order deleted successfully
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: object
   *                              properties:
   *                                  status:
   *                                      type: string
   *                                      enum: [success]
   *                                  message:
   *                                      type: string
   *                                  o_id:
   *                                      type: integer
   */
  router.delete("/:o_id", orderController.deleteOrder);
};
