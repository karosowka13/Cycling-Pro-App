const fileFilter = (req, file, cb) => {
  // Accept data only
  if (!file.originalname.match(/\.(fit|gpx|txt|tcx|csv|json)$/)) {
    req.fileValidationError = "Allowed only .fit .gpx .tcx .csv";
    return cb(new Error("Allowed only .fit .gpx .tcx .csv"), false);
  }
  cb(null, true);
};
exports.fileFilter = fileFilter;
