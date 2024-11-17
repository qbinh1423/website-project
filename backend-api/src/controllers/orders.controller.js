const orderService = require("../services/orders.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

const knex = require("../database/knex");

function userRepository() {
  return knex("users");
}

async function createdOrder(req, res, next) {
  try {
    const { userName, o_date } = req.body;
    const user = await userRepository().where({ u_name: userName }).first();

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    const order = await orderService.createOrder(user.u_id, o_date);
    return res.status(201).json(JSend.success({ order }));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while creating the order")
    );
  }
}

async function getAllOrders(req, res, next) {
  try {
    const details = await orderService.getAllOrders();
    return res.status(200).json(JSend.success({ details }));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while retrieving the order details")
    );
  }
}

async function getOrderDetails(req, res, next) {
  try {
    const orderId = req.params.o_id;
    const details = await orderService.getOrderDetails(orderId);
    return res.status(200).json(JSend.success({ details }));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while retrieving the order details")
    );
  }
}

async function deleteOrder(req, res, next) {
  try {
    const orderId = req.params.o_id;
    const result = await orderService.deleteOrder(orderId);
    return res.status(200).json(JSend.success(result));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while deleting the order")
    );
  }
}

module.exports = {
  createdOrder,
  getAllOrders,
  getOrderDetails,
  deleteOrder,
};
