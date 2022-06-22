const { validationResult } = require('express-validator');
const response = require('./../utility/responseModel');

const validate = (req,res,next) => {
    try {
        // Mengambil semua error yang terjadi saat melakukan validasi di middleware sebelumnya
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Semua data error disimpan di variabel errors.array()
            const dataErrorFromExpressValidator = errors.array();
            // Saat mau mengembalikan response dari request wajib melakukan return agar server tidak error
            return res.status(400).json(response.error(400,dataErrorFromExpressValidator));
        } else {
            // Jika tidak ada error,maka akan masuk ke controller
            next();
        }

    } catch (error) {
        // Delete file uploaded by multer(previous middleware) in ~/public/static/images
        fs.unlinkSync(req.file.path);
        console.log(error);
        // Saat mau mengembalikan response dari request wajib melakukan return agar server tidak error
        return res.status(500).json(response.error(500,'Internal Server Error'))
    }
}

module.exports = validate;