const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config();
const app = express();
const cors = require("cors");
const PORT = 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Stock?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.log(error);
  });

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

app.post("/createproduct", async (req, res) => {
  try {
    const bodyData = req.body;
    const product = new Product(bodyData);
    const productData = await product.save();
    res.send(productData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/readallproduct", async (req, res) => {
  try {
    const productData = await Product.find({});
    res.send(productData);
  } catch (error) {
    res.send(error);
  }
});
app.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

// update user

app.put("/updateproduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: id });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`server running on ...${PORT}`);
});
