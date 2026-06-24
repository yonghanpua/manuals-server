const express = require("express");
const fs = require("fs");
const path = require("path");
const { getLocalIP } = require("../utils/network");

const router = express.Router();
const PDF_DIR = path.join(__dirname, "../pdfs");

router.get("/", (req, res) => {
  const files = fs
    .readdirSync(PDF_DIR)
    .filter((f) => f.toLowerCase().endsWith(".pdf"))
    .map((file) => ({
      file,
      name: file.replace(/\.pdf$/i, "").replace(/[-_]/g, " "),
      encoded: encodeURIComponent(file),
    }));

  const ip = getLocalIP();
  const baseUrl = `http://${ip}:${process.env.PORT || 3000}`;

  res.render("home", { files, baseUrl });
});

module.exports = router;
