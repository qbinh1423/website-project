const productService = require("../services/products.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

const knex = require("../database/knex");

function categoryRepository() {
  return knex("category");
}

function productRepository() {
  return knex("products");
}

async function insertProduct(req, res, next) {
  console.log("Request body:", req.body);
  if (!req.body?.p_name || typeof req.body.p_name !== "string") {
    return next(new ApiError(400, "Name should be a non-empty string"));
  }
  try {
    const product = await productService.postProduct({
      ...req.body,
      p_image: req.file ? `/public/uploads/${req.file.filename}` : null,
      categoryName: req.body.categoryName,
    });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${product.p_id}`,
      })
      .json(JSend.success({ product }));
  } catch (error) {
    console.log("Error details:", error);
    return next(new ApiError(500, "An error occured while insert the product"));
  }
}

async function getAllProduct(req, res, next) {
  try {
    const products = await productService.getAllProduct();
    if (!products.length === 0) {
      return next(new ApiError(400, "Product not found"));
    }
    return res.json(JSend.success({ products }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving product`));
  }
}

async function getProductbyID(req, res, next) {
  const { p_id } = req.params;
  try {
    const product = await productService.getProductbyID(p_id);
    if (!product) {
      return next(new ApiError(400, "Product not found"));
    }
    return res.json(JSend.success({ product }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving product with id=${p_id}`));
  }
}

async function getProductbyFilter(req, res, next) {
  let result = {
    products: [],
  };

  try {
    result = await productService.getProductbyFilter(req.query);
    return res.json({
      products: result.products,
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving product`));
  }
}

async function getProductbyCategory(req, res, next) {
  try {
    // const categoryName = req.params.c_name;
    const { c_name } = req.params;
    const category = await categoryRepository().where("c_name", c_name).first();

    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    const products = await productService.getProductbyCategory(c_name);

    if (!products || products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    return res.status(200).json(JSend.success({ products }));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while retrieving the order details")
    );
  }
}

async function getProductByIdWithCategory(req, res, next) {
  try {
    const { p_id } = req.params;
    console.log(`Fetching product with p_id: ${p_id}`);

    const product = await productRepository().where("p_id", p_id).first();

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const productWithCategory =
      await productService.getProductByIdWithCategory(p_id);
    console.log("Fetched product:", productWithCategory);

    if (!productWithCategory) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    if (!productWithCategory.categoryName) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    return res
      .status(200)
      .json(JSend.success({ product: productWithCategory }));
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(
        500,
        "An error occurred while retrieving the product details"
      )
    );
  }
}

async function updateProduct(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  const { p_id } = req.params;
  try {
    const updated = await productService.updateProduct(p_id, {
      ...req.body,
      p_image: req.file ? `/public/uploads/${req.file.filename}` : null,
    });
    if (!updated) {
      return next(new ApiError(404, "Product not found"));
    }
    return res.json(
      JSend.success({
        product: updated,
      })
    );
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error updating product with id=${p_id}`));
  }
}

async function deletedProduct(req, res, next) {
  const { p_id } = req.params;
  try {
    const deleted = await productService.deleteProduct(p_id);
    if (!deleted) {
      return next(new ApiError(404, "Product not found"));
    }
    return res.json(JSend.success(deleted));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Could not delete product with id=${p_id}`));
  }
}

module.exports = {
  insertProduct,
  getAllProduct,
  getProductbyID,
  getProductbyFilter,
  getProductbyCategory,
  getProductByIdWithCategory,
  updateProduct,
  deletedProduct,
};
