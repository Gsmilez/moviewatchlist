const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/User");
const movieRoute = require("./routes/movies");
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("MongoDB Connection Successful...")
);
app.use("/user", userRouter);
app.use("/movies", movieRoute);
port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
