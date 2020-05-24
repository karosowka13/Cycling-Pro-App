const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const formData = require("express-form-data");
const streamifier = require("streamifier");
const bodyParser = require("body-parser");

const helpers = require("./helpers/helpers");

app.use(cors());
//app.use(formData.parse());
app.use(bodyParser.raw());
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.use(express.static(__dirname + "/public"));

const upload = multer({
  storage: storage,
  fileFilter: helpers.fileFilter,
}).single("file");

app.get("/", function (req, res) {
  return res.send("Hello Server");
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.end(res.writeHead(415, req.fileValidationError));
    } else if (!req.file) {
      return res.end(res.writeHead(404, "Please select a file to upload"));
    } else if (err instanceof multer.MulterError) {
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
