const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// ================= PATHS =================
const uploadsPath = path.join(__dirname, "public/uploads");
const dataFile = path.join(__dirname, "data.json");

// ================= CREATE FOLDERS =================
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// ================= STATIC =================
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(uploadsPath));

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// ================= LOAD DATA =================
let foods = [];

const defaultFoods = [
  {
    id: 1,
    title: "Burger",
    category: "FastFood",
    price: 18000,
    bat: "Mazali burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    id: 2,
    title: "Pizza",
    category: "FastFood",
    price: 45000,
    bat: "Issiq pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
  },
  {
    id: 3,
    title: "Lavash",
    category: "FastFood",
    price: 25000,
    bat: "Tovuq lavash",
    image: "https://images.unsplash.com/photo-1604908177522-0400c9d4a2c5"
  }
];

// load from file or default
if (fs.existsSync(dataFile)) {
  try {
    foods = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  } catch (e) {
    foods = defaultFoods;
  }
} else {
  foods = defaultFoods;
  fs.writeFileSync(dataFile, JSON.stringify(foods, null, 2));
}

// ================= SAVE FUNCTION =================
function saveFoods() {
  fs.writeFileSync(dataFile, JSON.stringify(foods, null, 2));
}

// ================= FOOD API =================

// GET all foods
app.get("/api/foods", (req, res) => {
  res.json(foods);
});

// ADD food (REST API)
app.post("/api/foods", (req, res) => {
  const newFood = {
    id: Date.now(),
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    bat: req.body.bat,
    image: req.body.image
  };

  foods.unshift(newFood);
  saveFoods();

  io.emit("update-foods", foods);

  res.json(newFood);
});

// DELETE food
app.delete("/api/foods/:id", (req, res) => {
  const id = Number(req.params.id);
  foods = foods.filter(f => f.id !== id);

  saveFoods();
  io.emit("update-foods", foods);

  res.json({ success: true });
});

// IMAGE UPLOAD
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image topilmadi" });
  }

  res.json({
    imagePath: `/uploads/${req.file.filename}`
  });
});

// ================= SOCKET =================
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("update-foods", foods);

  socket.on("add-food", (food) => {
    const newFood = {
      id: Date.now(),
      title: food.title,
      category: food.category,
      price: food.price,
      bat: food.bat,
      image: food.image
    };

    foods.unshift(newFood);
    saveFoods();

    io.emit("update-foods", foods);
  });

  socket.on("delete-food", (id) => {
    foods = foods.filter(f => f.id !== id);
    saveFoods();

    io.emit("update-foods", foods);
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 SERVER RUNNING ON PORT " + PORT);
});