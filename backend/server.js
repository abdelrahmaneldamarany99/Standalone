const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
mongoose.set("strictQuery", true);
const { USER_NAME, PASSWORD } = process.env;
const mongoUrl = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.tlazc.mongodb.net/`;
// require('dotenv').config({debug : true})

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use(customerRoutes);
app.use(authRoutes);

mongoose
  .connect(mongoUrl)
  .then(() =>
    app.listen(port, () =>
      console.log(`connected to mongoDb with port ${port}`)
    )
  )
  .catch(() => console.log("Failed to connect to mongoDb"));
