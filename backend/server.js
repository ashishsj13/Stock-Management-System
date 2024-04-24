const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PORT = 5000;
app.use(cors());
const multer = require("multer"); 
app.use(express.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

mongoose
  .connect("mongodb://localhost:27017/Stock?retryWrites=true&w=majority")
  .then(() => 
  {
    console.log("Database connected!");
  })
  .catch((error) => 
  {
    console.log(error);
  });

const productSchema = new mongoose.Schema
(
  {
    name: 
    {
      type: String,
      required: true,
    },
    quantity: 
    {
      type: Number,
      required: true,
    },
    price: 
    {
      type: Number,
      required: true,
    },
    imageUrl: 
    {
      type: String, 
    },
  },
  { 
    timestamps: true 
  }
);

const Product = mongoose.model("Product", productSchema);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "10m" });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


const storage = multer.diskStorage(
{
    destination: function (req, file, cb) 
    {
      cb(null, "uploads/"); 
    },
  
    filename: function (req, file, cb) 
    {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); 
      const filename = uniqueSuffix + "-" + file.originalname;
      cb(null, filename);
    },
});

function normalizeFilePath(filePath) 
{
  return filePath.replace(/\\/g, '/');
}

module.exports = 
{
  storage,
  normalizeFilePath,
};

const upload = multer({ storage: storage });

app.post("/createproduct", upload.single("image"), async (req, res) => 
{
  try 
  {
    const { name, quantity, price } = req.body;
    const product = new Product({ name, quantity, price });
    if (req.file) 
    {
      product.imageUrl = req.file.path;
    }
    const productData = await product.save();
    res.send(productData);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
});

app.get("/readallproduct", async (req, res) => 
{
  try 
  {
    const productData = await Product.find({});
    res.send(productData);
  } 
  catch (error) 
  {
    res.send(error);
  }
});

app.get("/read/:id", async (req, res) => 
{
  try 
  {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });
    res.send(product);
  } 
  catch (error) 
  {
    res.send(error);
  }
});

app.put("/updateproduct/:id", upload.single("image"), async (req, res) => 
{
  try 
  {
    const id = req.params.id;
    let updateData = req.body;
    if (req.file) 
    {
      updateData.imageUrl = req.file.path;
    }
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.send(product);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
});

app.delete("/delete/:id", async (req, res) => 
{
  try 
  {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: id });
    res.send(product);
  } 
  catch (error) 
  {
    res.send(error);
  }
});

app.listen(PORT, () => 
{
  console.log(`server running on ...${PORT}`);
});
