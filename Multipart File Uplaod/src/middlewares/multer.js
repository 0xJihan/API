const fs = require('fs');

const path = require('path');
const multer = require('multer');

//! Ensure the images directory exists
const imagesDir = '/opt/lampp/htdocs/images';
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true }); //! Create directory recursively to avoid issues if parent directories don't exist
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        const fileName = uniqueSuffix + '.' + extension; //! Use . instead of -
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage: storage });


module.exports = {uploadFile};