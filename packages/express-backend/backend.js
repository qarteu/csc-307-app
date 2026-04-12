import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// Sample data
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Helper functions
const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

const addUser = (user) => {
  users.users_list.push(user);
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === -1) return false;
  users.users_list.splice(index, 1);
  return true;
};

// Routes

// 1. Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 2. Get users (with optional name + job filter)
app.get("/users", (req, res) => {
  let result = users.users_list;

  if (req.query.name) {
    result = result.filter((user) => user.name === req.query.name);
  }

  if (req.query.job) {
    result = result.filter((user) => user.job === req.query.job);
  }

  res.send({ users_list: result });
});

// 3. Get user by ID
app.get("/users/:id", (req, res) => {
  const user = findUserById(req.params.id);

  if (!user) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(user);
  }
});

// 4. Add user
app.post("/users", (req, res) => {
  addUser(req.body);
  res.send();
});

// 5. Delete user
app.delete("/users/:id", (req, res) => {
  const success = deleteUserById(req.params.id);

  if (!success) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});