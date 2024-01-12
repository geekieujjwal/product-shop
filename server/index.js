require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const jwtkey = "e-comm";

const express = require("express");
const cors = require("cors");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "something went wrong, Please try after some time",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send("No user found");
    }
  }
});

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
  console.log(result);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("No products found");
  }
});

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/update/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found" });
  }
});

app.put("/product/:id", async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      // { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

//Port
app.listen(3000, () => {
  console.log("listening on port 3000");
});
