const {User} = require('./../models/');
const response = require('./../utility/responseModel');
const bcrypt = require('../utility/bcrypt');
const dataUserAll = (req,res) => {
    res.status(200).json({
        messege : 'Succcess'
    })
}
const createUser = async (req,res,next) => {
    // Pakai try catch untuk handle error by server agar bisa ditangkap
    try {
        // Di req.body akan ada data = {email,password,name} untuk register
        const {email,password,name} = req.body
        // Email harus unique,jadi sebelum create melakukan validasi
        // dengan cara findOne dengan menggunakan email
        const findUserByEmail = await User.findOne({
            where : {
                email
            }
        })
        // Jika ditemukan/true maka kembalikan response error dan jika false maka bisa membuat user
        if (findUserByEmail) {
            // response.error merupakan utility yang dibuat di folder utility/responseModel.js
            // Saat mau mengembalikan response dari request wajib melakukan return agar server tidak error
            return res.status(400).json(response.error(400,'Email sudah digunakan'));
            
        }
        // Sebelum create user di database,password harus di enkripsi terlebih dahulu
        const hashedPassword = await bcrypt.hash(password);
        // Buat data yang akan dimasukkan ke database,karna untuk data profile secara default harus null
        // jadi untuk menambahkan data profile bisa melakukan update user saja
        const dataToBeInsertToDatabase = {
            email : email,
            password : hashedPassword,
            profile_picture : null,
            phone_number : null,
            address : null,
            city_id : null,
            name : name
        }
        // Membuat user ke database
        const createUser = await User.create(dataToBeInsertToDatabase);
        // Jika berhasil,buat data untuk diberikan pada response
        // data yang credential seperti password,email,address tidak usah dikirim di response
        // kecuali jika dibutuhkan
        const dataToBeSentToResponse = {
            id : createUser.id,
            name : createUser.name
        }
        // Saat mau mengembalikan response dari request wajib melakukan return agar server tidak error
        return res.status(201).json(response.success(201,dataToBeSentToResponse));
    } catch(err) {
        console.log(err);
        // Saat mau mengembalikan response dari request wajib melakukan return agar server tidak error
        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
    



}


module.exports = {
    dataUserAll,
    createUser
}