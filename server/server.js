const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

// ================= CREATE UPLOADS FOLDER =================
const uploadsPath = path.join(__dirname, "public/uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// ================= STATIC =================
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(uploadsPath));

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ================= IMAGE UPLOAD =================
app.post("/upload", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      error: "Image topilmadi"
    });
  }

  res.json({
    imagePath: `/uploads/${req.file.filename}`
  });

});

// ================= DATA =================
let foods = [
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
  }
];

// ================= SOCKET =================
io.on("connection", (socket) => {

  console.log("Client connected");

  socket.emit("update-foods", foods);

  // ADD FOOD
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

    io.emit("update-foods", foods);

  });

  // DELETE FOOD
  socket.on("delete-food", (id) => {

    foods = foods.filter(f => f.id !== id);

    io.emit("update-foods", foods);

  });

});

// ================= START =================
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 SERVER RUNNING ON PORT " + PORT);
});