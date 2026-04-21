const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORTANT (this was missing before)
let todos = [];

// ===== CREATE =====
app.post("/add", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };

  todos.push(todo);
  res.json(todo);
});
// ===== READ =====
app.get("/", (req, res) => {
  res.json(todos);
});

// ===== UPDATE =====
app.put("/update/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.map(t =>
    t.id === id ? { ...t, completed: true } : t
  );

  res.json({ message: "Updated" });
});

// ===== DELETE =====
app.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter(t => t.id !== id);

  res.json({ message: "Deleted" });
});

// ===== SERVER =====
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});