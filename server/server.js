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
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// ================= DATA =================
let foods = [];

// LOAD DATA
if (fs.existsSync(dataFile)) {
  try {
    foods = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch (err) {
    console.log("DATA LOAD ERROR");
    foods = [];
  }
}

// DEFAULT FOODS
if (foods.length === 0) {
  foods = [
    {
      id: 1,
      title: "Burger",
      category: "FastFood",
      price: 18000,
      bat: "Mazali burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },

    {
      id: 2,
      title: "Pizza",
      category: "FastFood",
      price: 45000,
      bat: "Issiq pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
       id: 1, title: "Pepsi 450ml",
        category: "Ichimliklar",
         price: 456, currency: "so'm",
          image: "picture/pepsi 450.jpg"
         },
    { 
      id: 2, title: "Pepsi 250ml",
       category: "Ichimliklar",
        price: 456, currency: "so'm",
         image: "picture/pepsi 0.25.jpg"
         },
    { id: 3, title: "Fanta 250ml",
       category: "Ichimliklar",
        price: 456, currency: "so'm",
         image: "picture/fanta 250.jpg"
         },
    { id: 4, title: "Adrenaline 250ml",
       category: "Ichimliklar",
        price: 456, currency: "so'm",
         image: "picture/adreline .jpg" 
        },
    { 
      id: 5, title: "Blance Blue Gazlanmagan",
       category: "Ichimliklar",
        price: 456, 
        currency: "so'm",
         image: "picture/blanc bleu  gazsiz.jpg" 
        },
    { 
      id: 6, title: "Blance Blue Gazlangan",
       category: "Ichimliklar",
        price: 456,
         currency: "so'm",
          image: "picture/blanc blue gazli.jpg"
         },
    {
       id: 7, title: "Chortoq 0.33",
        category: "Ichimliklar",
         price: 456,
          currency: "so'm",
           image: "picture/chortoq 0,33.jpg"
           },
    {
       id: 8, title: "Coca Cola 250ml",
        category: "Ichimliklar",
         price: 456,
          currency: "so'm",
           image: "picture/cola 250.jpg" 
          },
    { 
      id: 9,
       title: "Natahtari Nok",
        category: "Ichimliklar",
         price: 456, currency: "so'm",
          image: "picture/Natahtalik.jpg"
         },
    { 
      id: 10,
       title: "Pepsi ... 250ml",
        category: "Ichimliklar",
         price: 456, currency: "so'm",
          image: "picture/pepsi 250 shisha.jpg" 
        },
    { 
      id: 11, title: "RedBull 250ml",
       category: "Ichimliklar",
        price: 456, 
        currency: "so'm",
         image: "picture/redbull 250 (1).jpg" 
        },
  ];

  fs.writeFileSync(dataFile, JSON.stringify(foods, null, 2));
}

// SAVE FUNCTION
function saveFoods() {
  fs.writeFileSync(dataFile, JSON.stringify(foods, null, 2));
}

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

// ================= API =================

// GET ALL FOODS
app.get("/api/foods", (req, res) => {
  res.json(foods);
});

// ADD FOOD API
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

  res.json({
    success: true,
    food: newFood
  });

});

// DELETE FOOD API
app.delete("/api/foods/:id", (req, res) => {

  const id = Number(req.params.id);

  foods = foods.filter(f => f.id !== id);

  saveFoods();

  io.emit("update-foods", foods);

  res.json({
    success: true
  });

});

// ================= SOCKET =================
io.on("connection", (socket) => {

  console.log("CLIENT CONNECTED");

  socket.emit("update-foods", foods);

  // ADD FOOD
  socket.on("add-food", (food) => {

    console.log("NEW FOOD:", food);

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

  // DELETE FOOD
  socket.on("delete-food", (id) => {

    foods = foods.filter(f => f.id !== id);

    saveFoods();

    io.emit("update-foods", foods);

  });

});

// ================= START =================
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 SERVER RUNNING ON PORT " + PORT);
});