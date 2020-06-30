/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */

export const isEmpty = (input) => {
  if (input === undefined || input === "") {
    return true;
  }
  if (input.replace(/\s/g, "").length) {
    return false;
  }
  return true;
};

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
export const empty = (input) => {
  if (input === undefined || input === "") {
    return true;
  }
};

export const isNumber = (input) => {
  const regex = /^[0-9]*$/gm;
  if (input.match(regex)) {
    return true;
  }
  return true;
};

export const fileFilter = (req, file, cb) => {
  // Accept data only
  if (!file.originalname.match(/\.(fit|gpx|txt|tcx|csv|json)$/)) {
    req.fileValidationError = "Allowed only .fit .gpx .tcx .csv";
    return cb(new Error("Allowed only .fit .gpx .tcx .csv"), false);
  }
  cb(null, true);
};
