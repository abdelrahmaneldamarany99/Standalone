const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
// require('dotenv').config({debug : true})
// mongoose.set("strictQuery", true);
// const { USER_NAME, PASSWORD } = process.env;
// const mongoUrl = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.tlazc.mongodb.net/`;

app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     credentials: true,
//   })
// )

app.use("/api/customers",customerRoutes);
app.use("/api/user",authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(port, () =>
      console.log(`connected to mongoDb through port ${port}`)
    )
  )
  .catch(() => console.log("Failed to connect to mongoDb"));
