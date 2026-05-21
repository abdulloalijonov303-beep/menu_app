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
      title: "Evro Medovik Shokolad",
      category: "Shirinliklar",
      price: 24000,
      bat: "Shocolad",
      image: "picture/photo_1_2026-05-16_13-52-40.jpg"
    },

    {
      id: 2,
      title: "Evro Medovik Karamel",
      category: "Shirinliklar",
      price: 24000,
      bat: "Karamel",
      image: "picture/photo_2_2026-05-16_13-52-40.jpg"

    },
    {
      id: 3,
      title: "Evro Medovik Malina",
      category: "Shirinliklar",
      price: 24000,
      bat: "Malina",
      image: "picture/photo_3_2026-05-16_13-52-40.jpg"

    },
    {
      id: 4,
      title: "Evro Medovik Limon",
      category: "Shirinliklar",
      price: 24000,
      bat: "Limon",
      image: "picture/photo_4_2026-05-16_13-52-40.jpg"

    },
    {
      id: 5,
      title: "Evro Medovik Shokolad & Malina",
      category: "Shirinliklar",
      price: 24000,
      bat: "Shokolad & Malina",
      image: "picture/photo_5_2026-05-16_13-52-40.jpg"

    },
    {
      id: 6,
      title: "Tartaletka  ",
      category: "Shirinliklar",
      price: 20000,
      bat: "Tartaletka",
      image: "picture/photo_6_2026-05-16_13-52-40.jpg"

    },
    {
      id: 7,
      title: "Konfig",
      category: "Shirinliklar",
      price: 25000,
      bat: "Malinoviy Konfig",
      image: "picture/photo_7_2026-05-16_13-52-40.jpg"

    },
    {
      id: 8,
      title: "Shutsert",
      category: "Shirinliklar",
      price: 20000,
      bat: "Malinoviy Nachinka",
      image: "picture/photo_8_2026-05-16_13-52-40.jpg"

    },
    {
      id: 9,
      title: "Tartaletka",
      category: "Shirinliklar",
      price: 16000,
      bat: "Cheescream",
      image: "picture/photo_9_2026-05-16_13-52-40.jpg"

    },
    {
      id: 10,
      title: "Tartaletka",
      category: "Shirinliklar",
      price: 20000,
      bat: "Shokolad",
      image: "picture/photo_10_2026-05-16_13-52-40.jpg"

    },
    {
      id: 11,
      title: "Tartaletka",
      category: "Shirinliklar",
      price: 16000,
      bat: "Shokolad",
      image: "picture/photo_11_2026-05-16_13-52-40.jpg"

    },
    {
      id: 12,
      title: "Cheesse cake",
      category: "Shirinliklar",
      price: 40000,
      bat: "Malina",
      image: "picture/photo_12_2026-05-16_13-52-40.jpg"

    },
    {
      id: 13,
      title: "Musuviy Cheesse cake",
      category: "Shirinliklar",
      price: 40000,
      bat: "Bilgiyskiy shocolad",
      image: "picture/photo_13_2026-05-16_13-52-40.jpg"

    },
    {
      id: 14,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_14_2026-05-16_13-52-40.jpg"

    },
    {
      id: 15,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_15_2026-05-16_13-52-40.jpg"

    },
    {
      id: 16,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_16_2026-05-16_13-52-40.jpg"

    },
    {
      id: 17,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_17_2026-05-16_13-52-40.jpg"

    },
    {
      id: 18,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_18_2026-05-16_13-52-40.jpg"

    },
    {
      id: 19,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_19_2026-05-16_13-52-40.jpg"

    },
    {
      id: 20,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_20_2026-05-16_13-52-40.jpg"

    },
    {
      id: 21,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_21_2026-05-16_13-52-40.jpg"

    },
    {
      id: 22,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_22_2026-05-16_13-52-40.jpg"

    },
    {
      id: 23,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_23_2026-05-16_13-52-40.jpg"

    },
    {
      id: 24,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_24_2026-05-16_13-52-40.jpg"

    },
    {
      id: 25,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_25_2026-05-16_13-52-40.jpg"

    },
    {
      id: 26,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_26_2026-05-16_13-52-40.jpg"

    },
    {
      id: 27,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_27_2026-05-16_13-52-40.jpg"

    },
    {
      id: 28,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_28_2026-05-16_13-52-40.jpg"

    },
    {
      id: 29,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_29_2026-05-16_13-52-40.jpg"

    },
    {
      id: 30,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_30_2026-05-16_13-52-40.jpg"

    },
    {
      id: 31,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_31_2026-05-16_13-52-40.jpg"

    },
    {
      id: 32,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_32_2026-05-16_13-52-40.jpg"

    },
    {
      id: 33,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_33_2026-05-16_13-52-40.jpg"

    },
    {
      id: 34,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_34_2026-05-16_13-52-40.jpg"

    },
    {
      id: 35,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_35_2026-05-16_13-52-40.jpg"

    },
    {
      id: 36,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_36_2026-05-16_13-52-40.jpg"

    },
    {
      id: 37,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_37_2026-05-16_13-52-40.jpg"

    },
    {
      id: 38,
      title: "",
      category: "Shirinliklar",
      price: 1,
      bat: "",
      image: "picture/photo_38_2026-05-16_13-52-40.jpg"

    },
    {
      id: 1, title: "Pepsi",
      category: "Ichimliklar",
      price: 12000,
      bat: "450 ml",
      image: "picture/pepsi 450.jpg"
    },
    {
      id: 2, title: "Pepsi",
      category: "Ichimliklar",
      price: 10000,
      bat: "250 ml",
      image: "picture/pepsi 0.25.jpg"
    },
    {
      id: 3, title: "Fanta",
      category: "Ichimliklar",
      price: 10000,
      bat: "250ml",
      image: "picture/fanta 250.jpg"
    },
    {
      id: 4, title: "Adrenaline",
      category: "Ichimliklar",
      price: 12000,
      bat: "250ml",
      image: "picture/adreline .jpg"
    },
    {
      id: 5, title: "Blance Blue",
      category: "Ichimliklar",
      price: 18000,
      bat: "Gazlanmagan",
      image: "picture/blanc bleu  gazsiz.jpg"
    },
    {
      id: 6, title: "Blance Blue",
      category: "Ichimliklar",
      price: 18000,
      bat: "Gazlangan",
      image: "picture/blanc blue gazli.jpg"
    },
    {
      id: 7, title: "Chortoq",
      category: "Ichimliklar",
      price: 18000,
      bat: "0.33 ml",
      image: "picture/chortoq 0,33.jpg"
    },
    {
      id: 8, title: "Coca Cola",
      category: "Ichimliklar",
      price: 10000,
      bat: "250 ml",
      image: "picture/cola 250.jpg"
    },
    {
      id: 9, title: "Natahtari",
      category: "Ichimliklar",
      price: 18000,
      bat: "Nok",
      image: "picture/Natahtalik.jpg"
    },
    {
      id: 10, title: "Pepsi",
      category: "Ichimliklar",
      price: 12000,
      bat: "shisha 250 ml",
      image: "picture/pepsi 250 shisha.jpg"
    },
    {
      id: 11, title: "RedBull",
      category: "Ichimliklar",
      price: 20000,
      bat: "250 ml",
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