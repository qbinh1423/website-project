const cartService = require("../services/cart.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function createCart(req, res, next) {
  try {
    const { userId, productId, cart_quantity } = req.body;

    if (!userId || !productId || !cart_quantity) {
      throw new ApiError(400, "Missing required fields");
    }

    const cart = await cartService.createCart({
      u_id: userId,
      p_id: productId,
      cart_quantity,
    });

    return res.status(201).json(JSend.success({ cart }));
  } catch (error) {
    console.error("Error:", error);
    return next(
      new ApiError(
        500,
        "An error occurred while adding the product to the cart"
      )
    );
  }
}

async function getCartByUser(req, res, next) {
  try {
    const { u_name } = req.params;
    const cartItems = await cartService.getCartByUser(u_name);

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json(JSend.fail("No items found in the cart"));
    }

    return res.status(200).json(JSend.success({ cartItems }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while fetching the cart"));
  }
}

async function updateCart(req, res, next) {
  try {
    const { userName, productName, cart_quantity } = req.body;

    if (!userName || !productName || !cart_quantity) {
      return next(new ApiError(400, "Missing required fields"));
    }

    const updatedCart = await cartService.updateCart({
      userName,
      productName,
      cart_quantity,
    });

    if (!updatedCart) {
      return next(new ApiError(404, "Cart item not found"));
    }

    return res.status(200).json(JSend.success(updatedCart));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while updating the cart"));
  }
}

async function deleteCart(req, res, next) {
  const { cart_id } = req.params;
  try {
    const deleted = await cartService.deleteCart(cart_id);
    if (!deleted) {
      return next(new ApiError(404, "Cart not found"));
    }
    return res.json(JSend.success(deleted));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Could not delete cart with id=${cart_id}`));
  }
}

async function deleteAllCart(req, res, next) {
  try {
    const result = await cartService.deleteAllCart();
    return res.status(200).json(JSend.success(result));
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(
        500,
        "An error occurred while deleting all items from the cart"
      )
    );
  }
}

module.exports = {
  createCart,
  getCartByUser,
  updateCart,
  deleteCart,
  deleteAllCart,
};
