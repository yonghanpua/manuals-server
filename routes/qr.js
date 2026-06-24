const express = require("express");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { getLocalIP } = require("../utils/network");

const router = express.Router();
const PDF_DIR = path.join(__dirname, "../pdfs");

router.get("/qr/:filename", async (req, res) => {
  const filename = decodeURIComponent(req.params.filename);
  const filepath = path.join(PDF_DIR, filename);
  if (!fs.existsSync(filepath))
    return res.status(404).render("404", { message: "Manual not found" });

  const ip = getLocalIP();
  const PORT = process.env.PORT || 3000;
  const viewUrl = `http://${ip}:${PORT}/view/${encodeURIComponent(filename)}`;
  const name = filename.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");

  const qrDataUrl = await QRCode.toDataURL(viewUrl, {
    width: 280,
    margin: 2,
    color: { dark: "#0f1117", light: "#ffffff" },
  });

  res.render("qr", { name, viewUrl, qrDataUrl });
});

module.exports = router;
