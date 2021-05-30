"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var router = _express["default"].Router();

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.fieldname, "-").concat(Date.now()).concat(_path["default"].extname(file.originalname)));
  }
});

var checkFileType = function checkFileType(file, cb) {
  var filterTypes = /jpg|jpeg|png/;
  var extname = filterTypes.test(_path["default"].extname(file.originalname).toLowerCase());
  var mimeType = filterTypes.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new Error('仅限图片格式!'));
  }
};

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
});
router.post('/', upload.single('image'), function (req, res) {
  res.send("/".concat(req.file.path));
});
var _default = router;
exports["default"] = _default;