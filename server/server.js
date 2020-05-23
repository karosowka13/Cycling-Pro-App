const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const formData = require("express-form-data");

app.use(cors());
app.use(formData.parse());

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");
app.get("/", function (req, res) {
  return res.send("Hello Server");
});

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
      // A Multer error occurred when uploading.
    } else if (err) {
      return res.status(500).json(err);
      // An unknown error occurred when uploading.
    }
    return console.log(req.files), res.status(200).send(req.file);

    // Everything went fine.
  });
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});
