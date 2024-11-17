const usersService = require("../services/users.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function register(req, res, next) {
  if (!req.body?.u_name || typeof req.body.u_name !== "string") {
    return next(new ApiError(400, "Name should be a non-empty string"));
  }

  try {
    const user = await usersService.signupUser(req.body);
    return res.status(201).json(
      JSend.success({
        user,
      })
    );
  } catch (error) {
    console.log(error);
    if (error.message === "Email already registered") {
      return next(new ApiError(400, error.message)); // Handle email conflict
    }
    return next(
      new ApiError(500, "An error occured while creating the account")
    );
  }
}

async function login(req, res, next) {
  const { u_email, u_password } = req.body;

  if (!u_email) {
    return next(new ApiError(400, "Email should be a valid string"));
  }

  try {
    const {
      u_id,
      u_name,
      u_email: Email,
      u_phone,
      u_address,
      token,
      u_role,
    } = await usersService.signinUser(u_email, u_password);
    return res.status(200).json(
      JSend.success({
        user: {
          u_id,
          u_name,
          u_email: Email,
          u_phone,
          u_address,
          u_role,
        },
        token,
      })
    );
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

async function getAllUser(req, res, next) {
  try {
    const user = await usersService.getAllUser();
    if (!user) {
      return next(new ApiError(400, "User not found"));
    }
    return res.json(JSend.success({ user }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving user`));
  }
}

async function getUserByID(req, res, next) {
  const { u_id } = req.params;
  try {
    const user = await usersService.getUserById(u_id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    return res.json(JSend.success({ user }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error user with id=${u_id}`));
  }
}

async function updatedUser(req, res, next) {
  const { u_id } = req.params;
  const payload = req.body;

  try {
    const user = await usersService.updateUser(u_id, payload);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    return res.status(200).json(
      JSend.success({
        user: user,
      })
    );
  } catch (error) {
    console.log("Error details:", error);
    return next(new ApiError(500, `Error user with id=${u_id}`));
  }
}

async function deleteUser(req, res, next) {
  const { u_id } = req.params;
  try {
    const deleted = await usersService.deleteUser(u_id);
    if (!deleted) {
      return next(new ApiError(404, "User not found"));
    }
    return res.json(JSend.success(deleted));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Could not delete user `));
  }
}

module.exports = {
  register,
  login,
  getAllUser,
  getUserByID,
  updatedUser,
  deleteUser,
};
