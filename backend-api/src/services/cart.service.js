const knex = require("../database/knex");

function cartRepository() {
  return knex("cart");
}

function productRepository() {
  return knex("products");
}

function userRepository() {
  return knex("users");
}

function readCart(payload) {
  return {
    u_id: payload.u_id,
    p_id: payload.p_id,
    cart_quantity: payload.cart_quantity,
  };
}

async function findOrCreateUser(userName) {
  try {
    let user = await userRepository().where({ u_name: userName }).first();

    if (!user) {
      const [userId] = await userRepository().insert({
        u_name: userName,
      });
      user = { u_id: userId, u_name: userName };
    }

    return user;
  } catch (error) {
    console.error("Error finding or creating user:", error);
    throw error;
  }
}

async function findOrCreateProduct(productName) {
  try {
    let product = await productRepository()
      .where({ p_name: productName })
      .first();

    if (!product) {
      const [p_id] = await productRepository().insert({
        p_name: productName,
      });
      product = { p_id: p_id, p_name: productName };
    }

    return product;
  } catch (error) {
    console.error("Error finding or creating product:", error);
    throw error;
  }
}

async function createCart({ u_id, p_id, cart_quantity }) {
  const user = await userRepository().where({ u_id: u_id }).first();
  if (!user) throw new Error("User not found");

  const product = await productRepository().where({ p_id: p_id }).first();
  if (!product) throw new Error("Product not found");

  const existingCartItem = await cartRepository()
    .where({ u_id: user.u_id, p_id: product.p_id })
    .first();

  if (existingCartItem) {
    await cartRepository()
      .where({ cart_id: existingCartItem.cart_id })
      .update({
        cart_quantity: existingCartItem.cart_quantity + cart_quantity,
      });

    return {
      cart_id: existingCartItem.cart_id,
      u_id: user.u_id,
      p_id: product.p_id,
      cart_quantity: existingCartItem.cart_quantity + cart_quantity,
    };
  } else {
    const [cart_id] = await cartRepository().insert({
      u_id: user.u_id,
      p_id: product.p_id,
      cart_quantity,
    });

    return {
      cart_id,
      u_id: user.u_id,
      p_id: product.p_id,
      cart_quantity,
    };
  }
}

async function getCartByUser(u_name) {
  try {
    const results = await cartRepository()
      .join("users", "cart.u_id", "=", "users.u_id")
      .where("users.u_name", u_name)
      .select("cart.*");

    return {
      status: "success",
      data: results,
    };
  } catch (error) {
    console.error("Error getting cart by user:", error);
    return { status: "fail", message: "Failed to get cart by user" };
  }
}

async function updateCart(payload) {
  try {
    const user = await findOrCreateUser(payload.userName);
    const product = await findOrCreateProduct(payload.productName);

    const existingCart = await cartRepository()
      .where({ u_id: user.u_id, p_id: product.p_id })
      .first();

    if (existingCart) {
      await cartRepository()
        .where({ u_id: user.u_id, p_id: product.p_id })
        .update({ cart_quantity: payload.cart_quantity });

      return {
        status: "success",
        data: {
          cart: {
            ...existingCart,
            cart_quantity: payload.cart_quantity,
          },
        },
      };
    } else {
      const cart = readCart({
        ...payload,
        u_id: user.u_id,
        p_id: product.p_id,
      });
      const [cart_id] = await cartRepository().insert(cart);

      return {
        status: "success",
        data: { cart_id, ...cart },
      };
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    return { status: "fail", message: "Failed to update cart" };
  }
}

async function deleteCart(cart_id) {
  try {
    const cartExists = await cartRepository().where({ cart_id }).first();

    if (!cartExists) {
      return { status: "fail", message: "Cart not found" };
    }

    await cartRepository().where({ cart_id }).del();
    return {
      status: "success",
      message: `Cart with ID ${cart_id} deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting cart:", error);
    return { status: "fail", message: "Failed to delete cart" };
  }
}

async function deleteAllCart() {
  try {
    const deleted = await cartRepository().del();

    if (deleted) {
      return {
        status: "success",
        message: "All items in the cart deleted successfully",
        deletedCount: deleted,
      };
    } else {
      return {
        status: "fail",
        message: "No items found in the cart to delete",
      };
    }
  } catch (error) {
    console.error("Error deleting all items in cart:", error);
    return {
      status: "fail",
      message: "Failed to delete all items in the cart",
    };
  }
}

module.exports = {
  createCart,
  getCartByUser,
  updateCart,
  deleteCart,
  deleteAllCart,
};
