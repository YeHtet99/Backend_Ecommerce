// const multer = require('multer');
const multer =require('multer')
const path = require('path');
const fs = require('fs');

const uploadFields = {
  'file': 'productData',
};

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/png": "png",
  "image/jpeg": "jpeg",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/pdf": "pdf",
  "text/csv": "csv",
};

const fileFilter = (req, file, cb) => {
  const isValidMimeType = !!MIME_TYPE[file.mimetype];
  if (isValidMimeType) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Please upload valid file types.'), false); // Reject file
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file",file)
    const uploadDirectory = `./upload/${uploadFields[file.fieldname]}`;
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }    
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const productFileUpload = multer({ 
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter
});

module.exports = productFileUpload;

