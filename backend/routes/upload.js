"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var router = express_1.default.Router();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    }
});
var checkFileType = function (file, cb) {
    var filterTypes = /jpg|jpeg|png/;
    var extname = filterTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    var mimeType = filterTypes.test(file.mimetype);
    if (mimeType && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('仅限图片格式!'));
    }
};
var upload = multer_1.default({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
router.post('/', upload.single('image'), function (req, res) {
    res.send("/" + req.file.path);
});
exports.default = router;
