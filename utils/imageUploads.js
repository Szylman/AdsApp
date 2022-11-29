const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const [name, ext] = file.originalname.split('.');
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
})

const imageUpload = multer({ 
    storage, limits: { fileSize: 1048576 } 
}); // max file size 10mb

module.exports = imageUpload;