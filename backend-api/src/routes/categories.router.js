const express = require("express");
const categoryController = require("../controllers/categories.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();
const multer = require("multer");

const upload = multer();

module.exports.setup = (app) => {
  app.use("/api/categories", router);

  /**
   * @swagger
   *  /api/categories:
   *  post:
   *      summary: Insert the book category
   *      description: Insert the book category
   *      requestBody:
   *          required: true
   *          content:
   *              multipart/form-data:
   *                  schema:
   *                      $ref: '#/components/schemas/Categories'
   *      tags:
   *          - category
   *      responses:
   *          201:
   *              description: A new category created
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
   *                                      category:
   *                                          $ref: '#/components/schemas/Categories'
   *
   */
  router.post("/", upload.none(), categoryController.insertCategory);

  /**
   * @swagger
   *  /api/categories/all:
   *    get:
   *      summary: Get category
   *      description: Get category
   *      parameters:
   *        - $ref: '#/components/parameters/limitParam'
   *        - $ref: '#/components/parameters/pageParam'
   *      tags:
   *        - category
   *      responses:
   *        200:
   *          description: A category
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
   *                      category:
   *                        type: array
   *                        items:
   *                          $ref: '#/components/schemas/Categories'
   */
  router.get("/all", categoryController.getCategory);

  /**
   * @swagger
   *  /api/categories/{c_id}:
   *    get:
   *      summary: Get category by ID
   *      description: Get category by ID
   *      parameters:
   *          - $ref: '#/components/parameters/categoryIdParam'
   *      tags:
   *        - category
   *      responses:
   *        200:
   *          description: A category by ID
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
   *                      category:
   *                          $ref: '#/components/schemas/Categories'
   */
  router.get("/:c_id", categoryController.getCategorybyID);

  /**
   * @swagger
   *  /api/categories/{c_id}:
   *      put:
   *          summary: Update category by ID
   *          description: Update category by ID
   *          parameters:
   *              - $ref: '#/components/parameters/categoryIdParam'
   *          requestBody:
   *              required: true
   *              content:
   *                  multipart/form-data:
   *                      schema:
   *                          $ref: '#/components/schemas/Categories'
   *          tags:
   *              - category
   *          responses:
   *              200:
   *                  description: An update category
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: object
   *                              properties:
   *                                  status:
   *                                      type: string
   *                                      description: The response status
   *                                      enum: [success]
   *                                  data:
   *                                      type: object
   *                                      properties:
   *                                          catetory:
   *                                              $ref: '#/components/schemas/Categories'
   */
  router.put("/:c_id", upload.none(), categoryController.updatedCategory);

  /**
   * @swagger
   * /api/categories/{c_id}:
   *  delete:
   *      summary: Delete category by ID
   *      description: Delete category by ID
   *      parameters:
   *          - $ref: '#/components/parameters/categoryIdParam'
   *      tags:
   *          - category
   *      responses:
   *          200:
   *              description: Category deleted
   *              $ref: '#components/responses/200NoData'
   */
  router.delete("/:c_id", categoryController.deletedCategory);
  router.all("/:c_id", methodNotAllowed);
};
