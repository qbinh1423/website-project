const knex = require("../database/knex");

function categoryRepository() {
  return knex("category");
}

function readCategory(payload) {
  return {
    c_id: payload.c_id,
    c_name: payload.c_name,
    c_saying: payload.c_saying,
    c_author_saying: payload.c_author_saying,
  };
}

async function postCategory(payload) {
  const category = await readCategory(payload);
  const [c_id] = await categoryRepository().insert(category);

  return { c_id, ...category };
}

async function getCategory() {
  return categoryRepository().select("*");
}

async function getCategorybyID(c_id) {
  return categoryRepository().where({ c_id }).select("*").first();
}

async function findCategoryById(c_id) {
  return await categoryRepository().where({ c_id }).first();
}

async function updateCategory(c_id, payload) {
  const updated = await categoryRepository().where({ c_id }).update(payload);
  if (updated) {
    return await findCategoryById(c_id);
  }

  return null;
}

async function deleteCategory(c_id) {
  const categoryExists = await categoryRepository().where({ c_id }).first();

  if (!categoryExists) {
    return null;
  }

  const deletedCategory = await categoryRepository().where({ c_id }).del();

  if (deletedCategory) {
    return { message: `Category with ID ${c_id} deleted successfully` };
  }

  return null;
}

module.exports = {
  postCategory,
  getCategory,
  getCategorybyID,
  updateCategory,
  deleteCategory,
};
