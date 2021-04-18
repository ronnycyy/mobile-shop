import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
});

const checkFileType = (file: Express.Multer.File, cb: Function) => {
  const filterTypes = /jpg|jpeg|png/
  const extname = filterTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = filterTypes.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true)
  } else {
    cb(new Error('仅限图片格式!'))
  }
}

const upload = multer({
  storage, fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
});

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router;