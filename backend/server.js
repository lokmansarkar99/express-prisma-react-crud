require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json()); // ✅ JSON Body Parser

// ✅ Create User
app.post("/users", async (req, res) => {
  try {
    const { name, age, email, phone } = req.body;
    const newUser = await prisma.user.create({
      data: { name, age, email, phone },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Read All Users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Read Single User
app.get("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ error: "Invalid ID format" });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update User
app.put("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ error: "Invalid ID format" });

    const { name, age, email, phone } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, age, email, phone },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ error: "Invalid ID format" });

    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Server Start
app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});
