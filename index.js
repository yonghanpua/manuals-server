require("dotenv").config();
const express = require("express");
const path = require("path");

const homeRouter = require("./routes/home");
const viewerRouter = require("./routes/viewer");

const app = express();
const PORT = process.env.PORT || 3000;
const PDF_DIR = path.join(__dirname, "pdfs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/pdfs", express.static(PDF_DIR));
app.use("/", homeRouter);
app.use("/", viewerRouter);

app.listen(PORT, "0.0.0.0", () => {
  const { getLocalIP } = require("./utils/network");
  console.log(`Manual Server running at http://${getLocalIP()}:${PORT}`);
});
