
const express = require("express");
const router = express.Router();

let users = [];

router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "All fields required" });
  }
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ msg: "User already exists" });

  users.push({ name, email, password, role });
  res.json({ msg: "User registered successfully" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  res.json({ msg: "Login success", user });
});

module.exports = router;
