const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage for products/machines
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// Storage for brochure
const brochureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/brochure/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, 'brochure' + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });
const uploadBrochure = multer({ storage: brochureStorage });

module.exports = { upload, uploadBrochure };
