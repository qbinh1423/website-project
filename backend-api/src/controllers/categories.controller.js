const categoryService = require("../services/categories.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function insertCategory(req, res, next) {
  if (!req.body?.c_name || typeof req.body.c_name !== "string") {
    return next(new ApiError(400, "Name should be a non-empty string"));
  }

  try {
    const category = await categoryService.postCategory({
      ...req.body,
    });
    return res.status(201).json(
      JSend.success({
        category,
      })
    );
  } catch (error) {
    console.log("Error details:", error);
    return next(
      new ApiError(500, "An error occured while insert the category")
    );
  }
}

async function getCategory(req, res, next) {
  try {
    const category = await categoryService.getCategory();
    if (!category.length === 0) {
      return next(new ApiError(400, "Category not found"));
    }
    return res.json(JSend.success({ category }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving product`));
  }
}

async function getCategorybyID(req, res, next) {
  try {
    const { c_id } = req.params;
    const category = await categoryService.getCategorybyID(c_id);

    if (!category) {
      return next(new ApiError(400, "Category not found"));
    }
    return res.json(JSend.success({ category }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving category`));
  }
}

async function updatedCategory(req, res, next) {
  const { c_id } = req.params;
  const payload = req.body;

  try {
    const category = await categoryService.updateCategory(c_id, payload);
    if (!category) {
      return next(new ApiError(404, `Category not found`));
    }

    return res.status(200).json(JSend.success({ category: category }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error updating category with id=${c_id}`));
  }
}

async function deletedCategory(req, res, next) {
  const { c_id } = req.params;
  try {
    const deleted = await categoryService.deleteCategory(c_id);
    if (!deleted) {
      return next(new ApiError(404, "Category not found"));
    }
    return res.json(JSend.success(deleted));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Could not delete category`));
  }
}
module.exports = {
  insertCategory,
  getCategory,
  getCategorybyID,
  updatedCategory,
  deletedCategory,
};
