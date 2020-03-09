require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const route = require("./routes/routes");
const multer = require("multer");
app.use(cors());
var path = require("path");

app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use("/api/v1", route);

app.listen(port, () => console.log(`Great, server run on port ${port}`));
