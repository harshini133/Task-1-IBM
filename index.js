const express = require("express");
const app = express();

app.use(express.json());


let users = [
  { id: 1, name: "Harshini", email: "harshini@gmail.com" }
];


app.get("/users", (req, res) => {
  res.json(users);
});


app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});


app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name;
  user.email = req.body.email;

  res.json(user);
});

// DELETE – Delete user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted successfully" });
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});