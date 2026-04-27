import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

const app = express();
const port = 8000;

mongoose.set("debug", true);

if (MONGO_CONNECTION_STRING) {
  mongoose.connect(`${MONGO_CONNECTION_STRING}users`).catch((error) => {
    console.log(error);
  });
} else {
  console.log(
    "MONGO_CONNECTION_STRING is not set. Create packages/express-backend/.env to enable MongoDB."
  );
}

app.use(cors());
app.use(express.json());

// Routes

// 1. Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 2. Get users (with optional name + job filter)
app.get("/users", (req, res) => {
  userService
    .getUsers(req.query.name, req.query.job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error));
});

// 3. Get user by ID
app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(500).send(error));
});

// 4. Add user
app.post("/users", (req, res) => {
  userService
    .addUser({
      name: req.body.name,
      job: req.body.job,
    })
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => res.status(500).send(error));
});

// 5. Delete user
app.delete("/users/:id", (req, res) => {
  userService
    .deleteUser(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => res.status(500).send(error));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
