const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes')
    },
    filename: (req, file, cd) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
fileFilter: (req, res, cb) =>{
    const fileTypes = /pdf|doc|docx/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error('Only .pdf, .doc, and .docx files are allowed'))
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 },
})

module.exports = upload;
