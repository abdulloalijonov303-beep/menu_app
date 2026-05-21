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
      id: 22,
      title: "Cheese cake San-Sebastyan",
      category: "Shirinliklar",
      price: 45000,
      bat: "Belgiyskiy Shokolad",
      image: "picture/photo_2026-05-21_16-38-35.jpg"

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
      id: 15,
      title: "Musuviy Cheese cake",
      category: "Shirinliklar",
      price: 40000,
      bat: "Belgiyskiy",
      image: "picture/photo_15_2026-05-16_13-52-40.jpg"

    },
    {
      id: 16,
      title: "Cheese cake Yogoqli ",
      category: "Shirinliklar",
      price: 40000,
      bat: "Yongoqli",
      image: "picture/photo_16_2026-05-16_13-52-40.jpg"

    },
    {
      id: 17,
      title: "Cheese cake Lotus",
      category: "Shirinliklar",
      price: 40000,
      bat: "cheese cake",
      image: "picture/photo_17_2026-05-16_13-52-40.jpg"

    },
        {
      id: 38,
      title: "Evro Medovik ",
      category: "Shirinliklar",
      price: 24000,
      bat: "Pistali",
      image: "picture/photo_38_2026-05-16_13-52-40.jpg"

    },
    {
      id: 1,
      title: "Evro Medovik ",
      category: "Shirinliklar",
      price: 24000,
      bat: "Shokolad",
      image: "picture/photo_1_2026-05-16_13-52-40.jpg"
    },

    {
      id: 2,
      title: "Evro Medovik ",
      category: "Shirinliklar",
      price: 24000,
      bat: "Karamel",
      image: "picture/photo_2_2026-05-16_13-52-40.jpg"

    },
    {
      id: 3,
      title: "Evro Medovik ",
      category: "Shirinliklar",
      price: 24000,
      bat: "Malina",
      image: "picture/photo_3_2026-05-16_13-52-40.jpg"

    },
    {
      id: 4,
      title: "Evro Medovik ",
      category: "Shirinliklar",
      price: 24000,
      bat: "Limon",
      image: "picture/photo_4_2026-05-16_13-52-40.jpg"

    },
    {
      id: 5,
      title: "Evro Medovik ",
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
      id: 14,
      title: "Fistashka",
      category: "Shirinliklar",
      price: 25000,
      bat: "Pistali",
      image: "picture/photo_14_2026-05-16_13-52-40.jpg"

    },
    
    {
      id: 18,
      title: "Tvorojniy",
      category: "Shirinliklar",
      price: 18000,
      bat: "Tvorojniy",
      image: "picture/photo_18_2026-05-16_13-52-40.jpg"

    },
    {
      id: 19,
      title: "Super Snickers",
      category: "Shirinliklar",
      price: 18000,
      bat: "Shokoladniy",
      image: "picture/photo_19_2026-05-16_13-52-40.jpg"

    },
    {
      id: 20,
      title: "Malinoviy",
      category: "Shirinliklar",
      price: 18000,
      bat: "Malinoviy",
      image: "picture/photo_20_2026-05-16_13-52-40.jpg"

    },
    {
      id: 21,
      title: "Spartak",
      category: "Shirinliklar",
      price: 25000,
      bat: "Pechenniy Testa",
      image: "picture/photo_21_2026-05-16_13-52-40.jpg"

    },
   
    {
      id: 23,
      title: "Prichuda",
      category: "Shirinliklar",
      price: 18000,
      bat: "prichuda",
      image: "picture/photo_23_2026-05-16_13-52-40.jpg"

    },
    {
      id: 24,
      title: "Ragalik",
      category: "Shirinliklar",
      price: 35000,
      bat: "Yongoqlik",
      image: "picture/photo_24_2026-05-16_13-52-40.jpg"

    },
    {
      id: 25,
      title: "Pechenniy",
      category: "Shirinliklar",
      price: 25000,
      bat: "yongoqlik fistashka",
      image: "picture/photo_25_2026-05-16_13-52-40.jpg"

    },
    {
      id: 26,
      title: "Pechenniy",
      category: "Shirinliklar",
      price: 35000,
      bat: "pistalik",
      image: "picture/photo_26_2026-05-16_13-52-40.jpg"

    },
    {
      id: 27,
      title: "Pechenniy",
      category: "Shirinliklar",
      price: 25000,
      bat: "Shokolad",
      image: "picture/photo_27_2026-05-16_13-52-40.jpg"

    },
    {
      id: 28,
      title: "Pechenniy",
      category: "Shirinliklar",
      price: 25000,
      bat: "Yongoqlik",
      image: "picture/photo_28_2026-05-16_13-52-40.jpg"

    },
    {
      id: 29,
      title: "Pechenniy",
      category: "Shirinliklar",
      price: 25000,
      bat: "Pechenniy",
      image: "picture/photo_29_2026-05-16_13-52-40.jpg"

    },
    {
      id: 30,
      title: "Musuviy Katta",
      category: "Shirinliklar",
      price: 60000,
      bat: "Limon",
      image: "picture/photo_30_2026-05-16_13-52-40.jpg"

    },
    {
      id: 31,
      title: "Musuviy Kichkina",
      category: "Shirinliklar",
      price: 16000,
      bat: "Malina",
      image: "picture/photo_31_2026-05-16_13-52-40.jpg"

    },
    {
      id: 32,
      title: "Musuviy Kichkina",
      category: "Shirinliklar",
      price: 16000,
      bat: "Limon",
      image: "picture/photo_32_2026-05-16_13-52-40.jpg"

    },
 
    {
      id: 34,
      title: "Musuviy Katta",
      category: "Shirinliklar",
      price: 60000,
      bat: "Malina",
      image: "picture/photo_34_2026-05-16_13-52-40.jpg"

    },
    {
      id: 35,
      title: "Musuviy Kichkina",
      category: "Shirinliklar",
      price: 16000,
      bat: "Kofeli",
      image: "picture/photo_35_2026-05-16_13-52-40.jpg"

    },
    {
      id: 36,
      title: "Musuviy Katta",
      category: "Shirinliklar",
      price: 60000,
      bat: "Kofeli",
      image: "picture/photo_36_2026-05-16_13-52-40.jpg"

    },
    {
      id: 37,
      title: "Kurosan",
      category: "Shirinliklar",
      price: 25000,
      bat: "Malina",
      image: "picture/photo_37_2026-05-16_13-52-40.jpg"

    },
       {
      id: 33,
      title: "Kurosan",
      category: "Shirinliklar",
      price: 25000,
      bat: "Shokolad",
      image: "picture/photo_33_2026-05-16_13-52-40.jpg"

    },

        {
      id: 1,
      title: "Milkshake",
      category: "Ichimliklar",
      price: 28000,
      bat: "Snikersli",
      image: "picture/photo_1_2026-05-16_13-59-08.jpg"
    },

    {
      id: 2,
      title: "Milkshake",
      category: "Ichimliklar",
      price: 28000,
      bat: "Kulpnoy",
      image: "picture/photo_3_2026-05-16_13-59-08.jpg"

    },
 
    {
      id: 11,
      title: "Milkshake",
      category: "Ichimliklar",
      price: 28000,
      bat: "Banan",
      image: "picture/photo_11_2026-05-16_13-59-08.jpg"

    },
    {
      id: 13,
      title: "Milkshake",
      category: "Ichimliklar",
      price: 35000,
      bat: "Oreo",
      image: "picture/photo_11_2026-05-16_13-59-08.jpg"

    },
    {
      id: 12,
      title: "Milkshake",
      category: "Ichimliklar",
      price: 28000,
      bat: "Bounty",
      image: "picture/photo_12_2026-05-16_13-59-08.jpg"

    },
    {
      id: 14,
      title: "Milkshake",
      category: "Ichimliklar",
      price: 28000,
      bat: "Malina",
      image: "picture/malina.jpg"

    },
    {
      id: 4,
      title: " Moxito Klassik",
      category: "Ichimliklar",
      price: 25000,
      bat: "Laym",
      image: "picture/photo_4_2026-05-16_13-59-08.jpg"

    },
    {
      id: 5,
      title: "Moxito Mango Marakuya",
      category: "Ichimliklar",
      price: 30000,
      bat: "Shokolad & Malina",
      image: "picture/photo_5_2026-05-16_13-59-08.jpg"

    },
    {
      id: 6,
      title: "MOxito Kulpnoy  ",
      category: "Ichimliklar",
      price: 25000,
      bat: "Tartaletka",
      image: "picture/photo_6_2026-05-16_13-59-08.jpg"

    },
    {
      id: 7,
      title: "Moxito Yagodniy",
      category: "Ichimliklar",
      price: 25000,
      bat: "Malinoviy Konfig",
      image: "picture/photo_7_2026-05-16_13-59-08.jpg"

    },
    {
      id: 8,
      title: "Moxito Malina",
      category: "Ichimliklar",
      price: 25000,
      bat: "Malinoviy Nachinka",
      image: "picture/photo_8_2026-05-16_13-59-08.jpg"

    },
    {
      id: 9,
      title: "Moxito Okean",
      category: "Ichimliklar",
      price: 25000,
      bat: "Cheescream",
      image: "picture/photo_9_2026-05-16_13-59-08.jpg"

    },
     {
          id: 11,
          title: "Aloe & Qulpnoy",
          category: "Ichimliklar",
          price: 35000,
          bat: "Bubble tea",
          image: "server/public/picture/aloe kulpinay bubble tea.jpg",
        },
        {
          id: 11,
          title: "Uzum & Tarvuz",
          category: "Ichimliklar",
          price: 35000,
          bat: "Bubble tea",
          image: "server/public/picture/uzum tarvuz bubble tea.jpg",
        },
        {
          id: 11,
          title: "Chernika",
          category: "Ichimliklar",
          price: 35000,
          bat: "Bubble tea",
          image: "server/public/picture/chernika bubble tea.jpg",
        },
    {
          id: 11,
          title: "Espresso",
          category: "Coftea",
          price: 20000,
          bat: "Arabica",
          image: "picture/espresso.jpg",
        },

        {
          id: 11,
          title: "Americano",
          category: "Coftea",
          price: 23000,
          bat: "Coffee",
          image: "picture/Americano.jpg.jpg",
        },

        {
          id: 11,
          title: "Americano Ice",
          category: "Coftea",
          price: 28000,
          bat: "Coffee Ice",
          image: "picture/americano ice.jpg",
        },
        
        {
          id: 11,
          title: "Latte",
          category: "Coftea",
          price: 25000,
          bat: "Latte coffee",
          image: "server/public/picture/latte.jpg",
        },
        
        {
          id: 11,
          title: "Latte Ice",
          category: "Coftea",
          price: 30000,
          bat: "Latte coffee",
          image: "server/public/picture/latte ice.png",
        },
        
        {
          id: 11,
          title: "Cappucino",
          category: "Coftea",
          price: 25000,
          bat: "Coffee",
          image: "server/public/picture/cappucino.jpg",
        },
        
        {
          id: 11,
          title: "Cappucino Ice",
          category: "Coftea",
          price: 30000,
          bat: "Coffee Ice",
          image: "server/public/picture/cappucino ice.jpg",
        },
        
        {
          id: 11,
          title: "Spanish Latte",
          category: "Coftea",
          price: 30000,
          bat: "Coffee late",
          image: "server/public/picture/spanish latte.jpg",
        },
        
        {
          id: 11,
          title: "Flat White",
          category: "Coftea",
          price: 35000,
          bat: "Coffee",
          image: "server/public/picture/flat white.jfif",
        },
        
        {
          id: 11,
          title: "Mango & Markuya",
          category: "Coftea",
          price: 25000,
          bat: "Choy",
          image: "server/public/picture/mango marakuya.jpg",
        },
        

        {
          id: 11,
          title: "Apelsin & Banan",
          category: "Coftea",
          price: 25000,
          bat: "Choy",
          image: "server/public/picture/banan apelsin.jpg",
        },
        
        
  
        {
          id: 11,
          title: "Tinchlantiruvchi",
          category: "Coftea",
          price: 30000,
          bat: "Choy",
          image: "server/public/picture/tinchlantiruvchi.jpg",
        },
        
       
        {
          id: 11,
          title: "Bardak",
          category: "Coftea",
          price: 35000,
          bat: "Choy",
          image: "server/public/picture/bardak.jpg",
        },
   
    {
      id: 1, title: "Pepsi",
      category: "Salqin Ichimliklar",
      price: 12000,
      bat: "450 ml",
      image: "picture/pepsi 450.jpg"
    },
    {
      id: 2, title: "Pepsi",
      category: "Salqin Ichimliklar",
      price: 10000,
      bat: "250 ml",
      image: "picture/pepsi 0.25.jpg"
    },
    {
      id: 3, title: "Fanta",
      category: "Salqin Ichimliklar",
      price: 10000,
      bat: "250ml",
      image: "picture/fanta 250.jpg"
    },
    {
      id: 4, title: "Adrenaline",
      category: "Salqin Ichimliklar",
      price: 12000,
      bat: "250ml",
      image: "picture/adreline .jpg"
    },
    {
      id: 5, title: "Blance Blue",
      category: "Salqin Ichimliklar",
      price: 18000,
      bat: "Gazlanmagan",
      image: "picture/blanc bleu  gazsiz.jpg"
    },
    {
      id: 6, title: "Blance Blue",
      category: "Salqin Ichimliklar",
      price: 18000,
      bat: "Gazlangan",
      image: "picture/blanc blue gazli.jpg"
    },
    {
      id: 7, title: "Chortoq",
      category: "Salqin Ichimliklar",
      price: 18000,
      bat: "0.33 ml",
      image: "picture/chortoq 0,33.jpg"
    },
    {
      id: 8, title: "Coca Cola",
      category: "Salqin Ichimliklar",
      price: 10000,
      bat: "250 ml",
      image: "picture/cola 250.jpg"
    },
    {
      id: 9, title: "Natahtari",
      category: "Salqin Ichimliklar",
      price: 18000,
      bat: "Nok",
      image: "picture/Natahtalik.jpg"
    },
    {
      id: 10, title: "Pepsi",
      category: "Salqin Ichimliklar",
      price: 12000,
      bat: "shisha 250 ml",
      image: "picture/pepsi 250 shisha.jpg"
    },
    {
      id: 11, title: "RedBull",
      category: "Salqin Ichimliklar",
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