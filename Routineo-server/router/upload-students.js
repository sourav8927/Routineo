const express = require("express");
const multer = require("multer");
const { extractData, uploadData } = require("../controllers/upload-students");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/extract", upload.single("file"), (req, res, next) => {
  console.log("Received File:", req.file);
  console.log("Received Body:", req.body);
  
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded! Check field name." });
  }
  
  extractData(req, res, next);
});

router.post("/upload", uploadData);

module.exports = router;
