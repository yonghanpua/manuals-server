const express = require("express");
const fs = require("fs");
const path = require("path");
const { getLocalIP } = require("../utils/network");

const router = express.Router();
const PDF_DIR = path.join(__dirname, "../pdfs");

router.get("/view/:filename", (req, res) => {
  const filename = decodeURIComponent(req.params.filename);
  const filepath = path.join(PDF_DIR, filename);
  if (!fs.existsSync(filepath))
    return res.status(404).render("404", { message: "Manual not found" });

  const ip = getLocalIP();
  const pdfUrl = `http://${ip}:${process.env.PORT || 3000}/pdfs/${encodeURIComponent(filename)}`;
  const name = filename.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");

  res.render("viewer", { name, pdfUrl });
});

module.exports = router;
