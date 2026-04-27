import User from "../models/user.js";

function getUsers(name, job) {
  let query = {};

  if (name && job) {
    query = { name: name, job: job };
  } else if (name) {
    query = { name: name };
  } else if (job) {
    query = { job: job };
  }

  return User.find(query);
}

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

export default {
  getUsers,
  findUserById,
  addUser,
  deleteUser,
};