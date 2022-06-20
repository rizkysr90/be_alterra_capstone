const multer = require('multer');
const response = require('./../utility/responseModel');

const MulterError = (err, req, res, next) => {
    console.log(err);
    // Mendapatkan Error multer dari filed MulterError
    if (err instanceof multer.MulterError) {
        if (err.code.error === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json(response.error(400,err.code.message));
        }
    } else if (err) {
        return res.status(500).json(response.error(500,'Internal Server Error'))
    }
    next()
}
const fileFilterImage = (req,file,cb) => {
    // Tipe file yang valid
    const validType = ['image/jpg','image/png','image/jpeg'];
    // Cek,apakah tipe file yang diupload sesuai
    if (validType.includes(file.mimetype)) {
        return cb(null, true);
    }
    // Membuat error message untuk handle Multer Error
    const multerErrorOption = {
        error : 'LIMIT_UNEXPECTED_FILE',
        message : {
            "location" : file.fieldname, 
            "description" : 'File harus bertipe jpg,jpeg,atau png'
        }
    }
    // Throw Error jika tipe file tidak sesuai
    cb(new multer.MulterError(multerErrorOption),false);
} 
const MulterImgSingle = multer({
    dest: 'uploads/',
    fileFilter:fileFilterImage
})

  


module.exports = {
    MulterImgSingle,
    MulterError
}