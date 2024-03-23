const sharp = require("sharp");
const fs = require("fs");
const path = require("path");


async function processImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 1024, height: 768 })
      .jpeg({ quality: 80 })
      .toBuffer();

    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = `./uploads/${uniqueName}${path.extname(req.file.originalname)}`;
    req.file.path = filePath;
    fs.writeFile(filePath, processedImageBuffer, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving processed image." });
      }
    });
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = processImage;
