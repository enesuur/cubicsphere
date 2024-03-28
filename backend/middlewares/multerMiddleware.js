const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const uploadImg = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/jpg") || file.mimetype.startsWith("image/jpeg") || file.mimetype.startsWith("image/png")) {
      cb(null, true);
    } else {
      cb(new Error("Only images files accepted."));
    }
  }
});


module.exports = uploadImg;
