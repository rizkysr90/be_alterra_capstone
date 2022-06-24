const { Product } = require('../models/')
const { Product_image } = require('../models/');
const response = require('./../utility/responseModel');
const cloudinary = require('../utility/cloudinary')
const fs = require('fs')


const dataProductAll = async (req, res) => {
    try{
        // Membuat Variabel row dan page yang telah di inputkan user
        let { page, row } = req.query.page
    
        // opsi yang digunakakan untuk menampilkan user 
        const options = {
            // membuat id yang ditampilkan berurutan
            order: [
                ['id', 'ASC'],
            ],
            // membuat agar yang di tampilkan hanya di dalam attribute
            attributes: ['id', 'name', 'price', 'description', 'isActive', 'status', 'id_user', 'id_category'],
                    // menampilkan foreig key product image yang ber primary key di product
                    include: [
                        {
                            model: Product_image,
                            attributes: ['id', 'name', 'url_image', 'product_id']
                        }
                    ],
            // membuat pagination 
            limit: row,
            offset: page
            
        }
    
        // memangil semua data di tabel product dan foreign keynya 
        const getDataProductAll = await Product.findAll(options)

        if (!getDataProductAll) {
            return res.status(404).json(response.error(404, 'Product not found'))
        }
    
        // menampilkan response semua data jika berhasil
        res.status(200).json(response.success(200, getDataProductAll))
    }catch(err){
        // menampilkan error di console log
        console.log(err)

        // menampilkan response semua data jika gagal
        return res.status(500).json(response.error(500, 'Internal Server Error'))
    }
   
}

const dataProductById = async (req, res) => {
    try{
        const id_product = req.params.id

        const optionsNotId = {
            where: {
                id: id_product
            }
        }
    
        const idnull = await Product.findOne(optionsNotId)
    
        if (idnull === null){
            return res.status(401).json(response.error(401,`id ${id_product} Tidak Ditemukan`));
        }  

        const options = {
            where: {
                id: id_product,
            },
            attributes: ['id', 'name', 'price', 'description', 'isActive', 'status', 'id_user', 'id_category'],
                    include: [
                        {
                            model: Product_image,
                            attributes: ['id', 'name', 'url_image', 'product_id']
                        }
                    ]
        }

        const getDataProducTById = await Product.findOne(options)

        if (!getDataProducTById) {
            res.status(404).json(response.error(404, 'Product not found'))
        }

        res.status(200).json(response.success(200, getDataProducTById))


    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500), 'Internal Server Error')
    }
}

const createDataProduct = async (req, res) => {
    try{
        // deklarasi variabel yang telah dinputkan oleh user untuk database product
        const {name, price, description, isActive, status, id_user, id_category} = req.body

        // deklarasi gambar yang telah di input user
        const files = req.files;
        
        // error headling jika gambar yang dimasukan tidak ada tau lebih dari 4
        if (files.length > 4 || files.length === 0) {
            return res.status(401).json(response.error(401, 'Gambar yang di masukan tidak boleh kosong dan lebih dari 4'))
        }

        // menyimpan data product yang dimasukan user ke variabel
        const dataMyProductInsertDatabase = {
            name: name,
            price: price,
            description: description,
            isActive: isActive,
            status: status
            // id_user: id_user,
            // id_category: id_category
        }
    
        // Membuat Product ke database
        const createProduct = await Product.create(dataMyProductInsertDatabase)
        
        // error headling jika database product gagal di buat di database
        if (!createProduct) {
            return res.status(404).json(response.error(404,'Data Product Gagal dibuat'));
        }
        
        // untuk mendeklarasikan fungsi yang berada di cloudinary dengan async await 
        const uploader = async (path) => await cloudinary.uploadCloudinary(path)
        
        const dataMyProductImagesInsertDatabase = []

        for(const file of files){
            // Mengambil lokasi file lalu mendeklarasikan ke variabel
            const {path} = file;
            // Mengambil name file lalu mendeklarasikan ke variabel
            const {originalname} = file;
            // memisahkan nama dan format gambar
            const nameImg = originalname.split('.')[0];
            // memanggil fungsi uploader untuk mengupload gambar ke cloudinary
            const newpath = await uploader(path)

             // Mengambil url_gambar public_id product lalu mendeklarasikan ke variabel
            const {secure_url, public_id} = newpath

            // menghapus file gambar setelah data gambar yang diperlukan telah disimpan di server agar tidak menyimpan banyak penyimpanan
            fs.unlinkSync(path)

            // menambahkan data yang igin dimasukan di tabel image product
            dataMyProductImagesInsertDatabase.push({
                name: nameImg,
                url_image: secure_url,
                product_id: createProduct.id,
                product_image_id: public_id
            })

        }


        // menambahkan data image product
        const createImagesProduct = await Product_image.bulkCreate(dataMyProductImagesInsertDatabase)

        if (!createImagesProduct) {
            res.status(404).json(response.error(404, 'Data Images Product Gagal Dibuat'))
        }

        // membuat variabel baru yang berisi data product yang telah berhasil di buat
        const dataProductSuccesCreate = await Product.findOne({
            where: {
                id: createProduct.id
            },
            attributes: ['id', 'name', 'price', 'description', 'isActive', 'status', 'id_user', 'id_category'],
                    include: [
                        {
                            model: Product_image,
                            attributes: ['id', 'name', 'url_image', 'product_id']
                        }
                    ]
        })

        // response jika semua proses berhasil
        res.status(201).json(response.success(201,dataProductSuccesCreate))


    }catch(err){
        // menampilkan error pada console log
        console.log(err)

        // response error jika proses gagal
        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
}

const updateDataProduct = async (req, res) => {
    try{
        // membuat variabel dengan value params id yang di input user
        const id_product = req.params.id

        // opsi yang digunakan untuk mengecek params id yang dimasukan user ada di database product image dengan attribute product_id
        const optionsNotId = {
            where: {
                id: id_product
            }
        }
    
        // membuat variabel dengan hasil pengecekan params id yang dimasukan user ada di database product image dengan attribute product_id atau tidak
        const idnull = await Product.findOne(optionsNotId)
    
        // mengakap error headling jika params id yang dimasukan user tidak ada
        if (idnull === null){
            return res.status(401).json(response.error(401,`id ${id_product} Tidak Ditemukan`));
        }  

        // deklarasi variabel yang telah dinputkan oleh user untuk database product
        const {name, price, description, gambar, isActive, status, id_user, id_category} = req.body

        // deklarasi gambar yang telah di input user
        const files = req.files;

        const options = {
                name: name,
                price: price,
                description: description,
                isActive: isActive,
                status: status,
                // id_user: id_user,
                // id_category: id_category
        }

        if (files.length === 0) {
            // error headling jika gambar yang dimasukan tidak ada tau lebih dari 4
            if (files.length > 4) return res.status(401).json(response.error(401, 'Gambar yang di masukan lebih dari 4'))
            
            const updateByProduct = await Product.update(options,
                {
                    where: {
                        id: id_product
                    }
                })

            // error headling jika data product gagal diperbarui
            if (updateByProduct === 0) {
                return res.status(404).json(response.success(404,'Data Product Gagal Di Perbarui'))
            }
        }

        // const updateByProduct = await Product.update(options,
        //     {
        //         where: {
        //             id: id_product
        //         }
        //     }
        // )
        // if (updateByProduct === 0) {
        //     return res.status(404).json(response.success(404,'Data Product Gagal Di Perbarui'))
        // }

        const dataProductImage = await Product_image.findAll({
            where:{
                product_id: id_product
            }
        })

        
        // untuk mendeklarasikan fungsi yang berada di cloudinary dengan async await 
        const uploader = async (path) => await cloudinary.uploadCloudinary(path)
        const deletee = async (path) => await cloudinary.deleteCloudinary(path)
        
        const dataMyProductImagesUpdateDatabase = []
        const dataImageProductInCoudinary = []
        
        for(const data of dataProductImage ){
            dataImageProductInCoudinary.push(data.product_image_id)
        }
         for(const file of files){

            const {product_image_id} = dataProductImage;

            dataImageProductInCoudinary.push(product_image_id)

            console.log(dataImageProductInCoudinary)
            return
             // Mengambil lokasi file lalu mendeklarasikan ke variabel
             const {path} = file;
             // Mengambil name file lalu mendeklarasikan ke variabel
             const {originalname} = file;
             // memisahkan nama dan format gambar
             const nameImg = originalname.split('.')[0];
             // memanggil fungsi uploader
             const newpath = await uploader(path)
              // Mengambil url_gambar product lalu mendeklarasikan ke variabel
             const {secure_url, public_id} = newpath
 
             dataMyProductImagesUpdateDatabase.push({
                 name: nameImg,
                 url_image: secure_url,
                 product_id: createProduct.id,
                product_image_id: public_id
             })

            deletee(path)
             
         }

         const updataImagesProduct = await Product_image.update(dataMyProductImagesUpdateDatabase, {
              where: {
                 id: [id_product]
              }
          })
 
          if (updataImagesProduct === 0) {
             return res.status(404).json(response.error(404,'Data gambar Product gagal Di Perbarui'))
          }

        return res.status(200).json(response.success(200,'Data Product Berhasil Di Perbarui'))

    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
}


const deleteDataProductById = async (req, res) => {
    try{
        // Mengambil Id params yang dimasukan user
        const id_Product = req.params.id

        // opsi untuk mengecek id pada product
        const optionsNotId = {
            where: {
                id: id_Product
            }
        }
    
        // mendapatkan hasil jika ada tau tidaknya data product dengan id yang dimasukan user
        const idnull = await Product.findOne(optionsNotId)
    
        // membuat error headling jika tidak ada data product dengan id yag dimasukan error 
        if (idnull === null){
            return res.status(401).json(response.error(401,`id_product ${id_Product} Tidak Ditemukan`));
        }

        // untuk mendeklarasikan fungsi yang berada di cloudinary dengan async await 
        const deletee = async (path) => await cloudinary.deleteCloudinary(path)

        // mengangkap semua data yang product id yang sesuai dengan inputan user
        const dataImageCloudinary = await Product_image.findAll({
            where: {
                product_id: id_Product
            }
        })

        // melakukan looping sesuai berapa id yang sama dimasukan user lalu menghapusnya di cloudinary
        for(const dataImage of dataImageCloudinary ){
            await deletee(dataImage.product_image_id)
        }

        // sebelunnya membuat product harus memasukan image jadi dipastikan product mempunyai image
        // Menghapus terlebih dahulu data image product karena jika dluan data product maka hanya attribute product id yang ke hapus di image product
        const deleteProductImage = await Product_image.destroy({
            where: {
                product_id : [id_Product]
            }
        })

        // mengangkap error headling jika data image product tidak berhasil dihapus
        if (deleteProductImage === 0) {
            return res.status(404).json(response.error(404, `Data Images Product dengan Product_id ${id_Product} Gagal Dihapus`))
        }

        // opsi untuk menghapus data product dengan berdasarkan id yang sama
        const options = {
            where: {
                id: id_Product
            }
        }

        // menghapus data product
        const deleteProduct = await Product.destroy(options)

        // menangkap error headling jika data product gagal di hapus
        if (deleteProduct === 0) {
            return res.status(404).json(response.error(404, `Data Product dengan id ${id_Product} Gagal Dihapus`))
        }
        
        // respon jika semua proses berhasil
        res.status(200).json(response.success(200, `Data Product dengan id ${id_Product} Berhasil Dihapus`))


    }catch(err){
        // menampilkan error pada console log
        console.log(err)

        // response error jika proses gagal
        return res.status(500).json(response.error(500, 'Internal Server Error'))
    }
}

module.exports = {
    dataProductAll,
    dataProductById,
    createDataProduct,
    updateDataProduct,
    deleteDataProductById
}