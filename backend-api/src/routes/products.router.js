const express = require("express");
const productController = require("../controllers/products.controller");
const bookUpload = require("../middlewares/book-upload.middleware");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/products", router);

  /**
   * @swagger
   *  /api/products:
   *  post:
   *      summary: Insert a new book
   *      description: Insert a new book
   *      requestBody:
   *          required: true
   *          content:
   *              multipart/form-data:
   *                  schema:
   *                      $ref: '#/components/schemas/Products'
   *      tags:
   *          - products
   *      responses:
   *          200:
   *              description: A new book inserted
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
   *                                      product:
   *                                          $ref: '#/components/schemas/Products'
   */
  router.post("/", bookUpload, productController.insertProduct);

  /**
   * @swagger
   *  /api/products/all:
   *    get:
   *      summary: Get product
   *      description: Get product
   *      parameters:
   *        - $ref: '#/components/parameters/limitParam'
   *        - $ref: '#/components/parameters/pageParam'
   *      tags:
   *        - products
   *      responses:
   *        200:
   *          description: A product
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties:
   *                      products:
   *                        type: array
   *                        items:
   *                          $ref: '#/components/schemas/Products'
   */
  router.get("/all", productController.getAllProduct);

  /**
   * @swagger
   *  /api/products/{p_id}:
   *    get:
   *      summary: Get product by ID
   *      description: Get product by ID
   *      parameters:
   *        - $ref: '#/components/parameters/productIdParam'
   *      tags:
   *        - products
   *      responses:
   *        200:
   *          description: A product
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties:
   *                      product:
   *                        $ref: '#/components/schemas/Products'
   */
  router.get("/:p_id", productController.getProductbyID);

  /**
   * @swagger
   *  /api/products:
   *    get:
   *      summary: Get products by name filter
   *      description: Get products by name filter
   *      parameters:
   *        - in: query
   *          name: p_name
   *          schema:
   *            type: string
   *          description: Filter by product name
   *      tags:
   *        - products
   *      responses:
   *        200:
   *          description: A list of products
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties: 
   *                      products:
   *                        type: array
   *                        items:
   *                          $ref: '#/components/schemas/Products'
   */
  router.get("/", productController.getProductbyFilter);

  /**
   * @swagger
   *  /api/products/category/{c_name}:
   *    get:
   *      summary: Get products by category
   *      description: Get products by category
   *      parameters:
   *        - in: path
   *          name: c_name
   *          schema:
   *            type: string
   *          description: Filter by category name
   *        - $ref: '#/components/parameters/limitParam'
   *        - $ref: '#/components/parameters/pageParam'
   *      tags:
   *        - products
   *      responses:
   *        200:
   *          description: A list of products
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties:
   *                      products:
   *                        type: array
   *                        items:
   *                          $ref: '#/components/schemas/Products'
   *                      metadata:
   *                        $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get("/category/:c_name", productController.getProductbyCategory);

  /**
   * @swagger
   *  /api/products/genres/{p_id}:
   *    get:
   *      summary: Get product with category name
   *      description: Retrieve a product and its category name by product ID
   *      parameters:
   *        - in: path
   *          name: p_id
   *          schema:
   *            type: integer
   *          description: The product ID to retrieve
   *      tags:
   *        - products
   *      responses:
   *        200:
   *          description: Product with its category name
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties:
   *                        product:
   *                          $ref: '#/components/schemas/Products'
   */
  router.get("/genres/:p_id", productController.getProductByIdWithCategory);

  /**
   * @swagger
   * /api/products/{p_id}:
   *  put:
   *    summary: Update product by ID
   *    description: Update product information by ID
   *    parameters:
   *      - $ref: '#/components/parameters/productIdParam'
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            $ref: '#/components/schemas/Products'
   *    tags:
   *      - products
   *    responses:
   *      200:
   *        description: An update user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  description: The response status
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    product:
   *                      $ref: '#/components/schemas/Products'
   */
  router.put("/:p_id", bookUpload, productController.updateProduct);

  /**
   * @swagger
   *  /api/products/{p_id}:
   *      delete:
   *          summary: Delete product by ID
   *          description: Delete product by ID
   *          parameters:
   *              - $ref: '#/components/parameters/productIdParam'
   *          tags:
   *              - products
   *          responses:
   *              200:
   *                  description: Product deleted
   *                  $ref: '#/components/responses/200NoData'
   */
  router.delete("/:p_id", productController.deletedProduct);
};
