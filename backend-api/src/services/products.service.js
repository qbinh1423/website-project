const knex = require("../database/knex");
const Paginator = require("./paginator");

function productRepository() {
  return knex("products");
}

function categoryRepository() {
  return knex("category");
}

function readProduct(payload) {
  return {
    p_name: payload.p_name,
    p_author: payload.p_author,
    p_publish_date: payload.p_publish_date,
    p_description: payload.p_description,
    p_price: payload.p_price,
    p_quantity: payload.p_quantity,
    p_image: payload.p_image,
    c_id: payload.c_id,
  };
}

async function findCategory(categoryName) {
  let category = await categoryRepository()
    .where({ c_name: categoryName })
    .first();
  if (!category) {
    const [newCategoryId] = await categoryRepository().insert({
      c_name: categoryName,
    });

    category = { c_id: newCategoryId, c_name: categoryName };
  }
  return category;
}

async function postProduct(payload) {
  const category = await findCategory(payload.p_category);
  const product = readProduct({ ...payload, c_id: category.c_id });
  const [p_id] = await productRepository().insert(product);
  return { p_id, ...product };
}

async function getAllProduct() {
  return productRepository().select("*");
}

async function getProductbyID(p_id) {
  return productRepository().where({ p_id }).select("*").first();
}

async function getProductbyFilter(query) {
  const { p_name } = query;

  let results = await productRepository()
    .where((builder) => {
      if (p_name) {
        builder.where("p_name", "like", `%${p_name}%`);
      }
    })
    .select(
      "p_id",
      "p_name",
      "p_author",
      "p_publish_date",
      "p_description",
      "p_price",
      "p_quantity",
      "p_image",
      "c_id"
    );

  return {
    products: results,
  };
}


async function getProductbyCategory(c_name) {
  console.log("Category name:", c_name);

  const products = await categoryRepository()
    .join("products", "category.c_id", "=", "products.c_id")
    .where("category.c_name", c_name)
    .select("products.*");

  console.log("Products found:", products);

  if (products.length === 0) {
    throw new Error("Product not found");
  }

  return products;
}

async function getProductByIdWithCategory(p_id) {
  try {
    const product = await productRepository()
      .select("products.*", "category.c_name as categoryName")
      .join("category", "products.c_id", "=", "category.c_id")
      .where("products.p_id", p_id)
      .first();

    console.log("Products found:", product);

    if (!product) {
      console.warn(`No product found with p_id ${p_id}`);
      return null;
    }

    return product;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

async function findProductById(p_id) {
  return await productRepository().where({ p_id }).first();
}

async function updateProduct(p_id, payload) {
  if (payload.p_category) {
    const category = await findCategory(payload.p_category);
    payload.c_id = category.c_id;
    delete payload.p_category;
  }
  const updated = await productRepository().where({ p_id }).update(payload);

  if (updated) {
    return await findProductById(p_id);
  }

  return null;
}

async function deleteProduct(p_id) {
  const productExists = await productRepository().where({ p_id }).first();

  if (!productExists) {
    return null;
  }

  const deleted = await productRepository().where({ p_id }).del();
  if (deleted) {
    return { message: `Product with ID ${p_id} deleted successfully` };
  }
  return null;
}

module.exports = {
  postProduct,
  getAllProduct,
  getProductbyID,
  getProductbyFilter,
  getProductbyCategory,
  getProductByIdWithCategory,
  updateProduct,
  deleteProduct,
};
