const express = require("express");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("connected to db"))
.catch((err) => console.log("error in connecting to db: ", err))

app.listen(3001, () => {
    console.log("server listening at port 3001")
})