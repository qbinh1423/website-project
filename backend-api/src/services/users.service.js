const knex = require("../database/knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function userRepository() {
  return knex("users");
}

function readUser(payload, hashedPassword) {
  return {
    u_name: payload.u_name,
    u_address: payload.u_address,
    u_phone: payload.u_phone,
    u_email: payload.u_email,
    u_password: hashedPassword,
    u_role: payload.u_role,
  };
}

async function signupUser(payload) {
  const existingUser = await userRepository()
    .where({ u_email: payload.u_email })
    .first();

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(payload.u_password, 10);

  const user = readUser(payload, hashedPassword);
  const [u_id] = await userRepository().insert(user);
  return { u_id, ...user };
}

async function signinUser(email, password) {
  console.log("Attempting to login with email:", email);
  console.log("Password entered:", password);

  const users = await userRepository().where({ u_email: email }).first();
  if (!users) {
    console.log("No user found with email:", email);
    throw new Error("Invalid email or password");
  }

  const passwordValid = await bcrypt.compare(password, users.u_password);
  if (!passwordValid) {
    console.log("Invalid password for user with email:", email);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      u_id: users.u_id,
      u_name: users.u_name,
      u_email: users.u_email,
      u_phone: users.u_phone,
      u_address: users.u_address,
      u_role: users.u_role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "6h" }
  );

  return {
    u_id: users.u_id,
    u_name: users.u_name,
    u_email: users.u_email,
    u_phone: users.u_phone,
    u_address: users.u_address,
    token,
    u_role: users.u_role,
  };
}

async function getAllUser() {
  return userRepository().select("*");
}

async function getUserById(u_id) {
  return userRepository().where({ u_id }).select("*").first();
}

async function updateUser(u_id, payload) {
  if (payload.u_password) {
    payload.u_password = await bcrypt.hash(payload.u_password, 10);
  }

  if (Object.keys(payload).length === 0) {
    throw new Error("No data provided to update");
  }

  const updated = await userRepository().where({ u_id }).update(payload);

  if (updated) {
    const user = await getUserById(u_id);

    return {
      u_name: user.u_name,
      u_phone: user.u_phone,
      u_email: user.u_email,
      u_address: user.u_address,
      u_password: user.u_password,
    };
  }
  return null;
}

async function deleteUser(u_id) {
  const userExists = await userRepository().where({ u_id }).first();

  if (!userExists) {
    return null;
  }

  const deleted = await userRepository().where({ u_id }).del();

  if (deleted) {
    return { message: `User with ID ${u_id} deleted successfully` };
  }

  return null;
}

module.exports = {
  signupUser,
  signinUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
