const knex = require("../database/knex");

function orderRepository() {
  return knex("orders");
}

function orderDetailRepository() {
  return knex("order_detail");
}

function cartRepository() {
  return knex("cart");
}

async function getCartItems(u_id) {
  return await cartRepository()
    .join("products", "cart.p_id", "=", "products.p_id")
    .where("cart.u_id", u_id)
    .select(
      "products.p_id",
      "products.p_name",
      "products.p_price",
      "cart.cart_quantity"
    );
}

async function createOrder(userName, o_date) {
  const cartItems = await getCartItems(userName);

  let o_total_price = 0;
  const orderDetails = cartItems.map((item) => {
    const itemTotalPrice = item.p_price * item.cart_quantity;
    o_total_price += itemTotalPrice;
    return {
      p_id: item.p_id,
      o_detail_quantity: item.cart_quantity,
      o_detail_price: item.p_price,
    };
  });

  const order = {
    o_date: o_date,
    o_total_price: o_total_price,
    u_id: userName,
  };

  const [o_id] = await orderRepository().insert(order);

  orderDetails.forEach((order_detail) => {
    order_detail.o_id = o_id;
  });

  await orderDetailRepository().insert(orderDetails);

  await cartRepository().where("u_id", userName).del();

  return { o_id, o_total_price, orderDetails };
}

async function getAllOrders() {
  return await orderDetailRepository()
    .join("products", "order_detail.p_id", "=", "products.p_id")
    .join("orders", "order_detail.o_id", "=", "orders.o_id")
    .join("users", "orders.u_id", "=", "users.u_id")
    .select(
      "orders.o_id",
      "orders.o_date",
      "orders.o_total_price",
      "orders.u_id AS userName",
      "users.u_name",
      "users.u_email",
      "users.u_phone",
      "users.u_address",
      "products.p_name",
      "order_detail.o_detail_quantity",
      "order_detail.o_detail_price"
    );
}

async function getOrderDetails(o_id) {
  return await orderDetailRepository()
    .join("products", "order_detail.p_id", "=", "products.p_id")
    .where("order_detail.o_id", o_id)
    .select(
      "products.p_name",
      "order_detail.o_detail_quantity",
      "order_detail.o_detail_price"
    );
}

async function deleteOrder(o_id) {
  await orderDetailRepository().where("o_id", o_id).del();

  const deletedOrder = await orderRepository().where("o_id", o_id).del();
  if (!deletedOrder) {
    throw new Error("Order not found");
  }
  return {
    message: `Order with ID ${o_id} deleted successfully`,
  };
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderDetails,
  deleteOrder,
};
