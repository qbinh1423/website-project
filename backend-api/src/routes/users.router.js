const express = require("express");
const usersController = require("../controllers/users.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const authenticateToken = require("../middlewares/auth");
const multer = require("multer");
const upload = multer();
const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/users", router);

  /**
   * @swagger
   *  /api/users/register:
   *  post:
   *      summary: Sign up a new user
   *      description: Register a new user
   *      requestBody:
   *          required: true
   *          content:
   *              multipart/form-data:
   *                  schema:
   *                      $ref: '#/components/schemas/Users'
   *      tags:
   *          - users
   *      responses:
   *          201:
   *              description: A new user account created
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
   *                                      user:
   *                                          $ref: '#/components/schemas/Users'
   */
  router.post("/register", upload.none(), usersController.register);

  /**
   * @swagger
   *  /api/users/login:
   *  post:
   *      summary: Log in an existing user
   *      description: Authenticate a user
   *      security:
   *          - bearerAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *              multipart/form-data:
   *                  schema:
   *                      type: object
   *                      properties:
   *                          u_email:
   *                              type: string
   *                              format: email
   *                              description: User's email address
   *                          u_password:
   *                              type: string
   *                              format: password
   *                              description: User's password
   *                          u_role:
   *                              type: integer
   *                              format: role
   *                              description: User's role
   *      tags:
   *          - users
   *      responses:
   *          200:
   *              description: User successfully logged in
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
   *                                      user:
   *                                          type: object
   *                                          properties:
   *                                              u_id:
   *                                                  type: integer
   *                                                  description: User's unique ID
   *                                              u_name:
   *                                                  type: string
   *                                                  description: User's name
   *                                              u_email:
   *                                                  type: string
   *                                                  format: email
   *                                                  description: User's email address
   *                                              u_phone:
   *                                                  type: string
   *                                                  description: User's phone number
   *                                              u_address:
   *                                                  type: string
   *                                                  description: User's address
   *                                              u_role:
   *                                                  type: integer
   *                                                  description: User's role
   */
  router.post("/login", upload.none(), usersController.login);

  /**
   * @swagger
   *  /api/users/all:
   *    get:
   *      summary: Get users
   *      description: Get a list of users
   *      parameters:
   *        - $ref: '#/components/parameters/limitParam'
   *        - $ref: '#/components/parameters/pageParam'
   *      tags:
   *        - users
   *      responses:
   *        200:
   *          description: A list of users
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  users:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/Users'
   */
  router.get("/all", usersController.getAllUser);

  /**
   * @swagger
   *  /api/users/{u_id}:
   *      get:
   *          summary: Get user by ID
   *          description: Get user by ID
   *          parameters:
   *              - $ref: '#/components/parameters/userIdParam'
   *          tags:
   *              - users
   *          responses:
   *              200:
   *                  description: The information of user
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
   *                                          user:
   *                                              $ref: '#/components/schemas/Users'
   */
  router.get("/:u_id", usersController.getUserByID);

  /**
   * @swagger
   *  /api/users/{u_id}:
   *      put:
   *          summary: Update user by ID
   *          description: Update user information by ID
   *          parameters:
   *              - $ref: '#/components/parameters/userIdParam'
   *          requestBody:
   *              required: true
   *              content:
   *                  multipart/form-data:
   *                      schema:
   *                          $ref: '#/components/schemas/Users'
   *          tags:
   *              - users
   *          responses:
   *              200:
   *                  description: An update user
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
   *                                          user:
   *                                              $ref: '#/components/schemas/Users'
   *
   */
  router.put("/:u_id", upload.none(), usersController.updatedUser);

  /**
   * @swagger
   *  /api/users/{u_id}:
   *      delete:
   *          summary: Delete user by ID
   *          description: Delete user by ID
   *          parameters:
   *              - name: u_id
   *                in: path
   *                required: true
   *                description: ID of the user to delete
   *                schema:
   *                  type: integer
   *          tags:
   *              - users
   *          responses:
   *              200:
   *                  description: User deleted
   *                  $ref: '#/components/responses/200NoData'
   *
   */
  router.delete("/:u_id", usersController.deleteUser);
  router.all("/:u_id", methodNotAllowed);
};
