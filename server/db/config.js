const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://geekieujjwal:143mongodb@clusternew.7jpdr4i.mongodb.net/e-commerce"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
