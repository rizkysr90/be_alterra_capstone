const { Product } = require('../models/')
const { Product_image } = require('../models/');
const response = require('./../utility/responseModel');
const cloudinary = require('../utility/cloudinary')


const dataProductAll = async (req, res, next) => {
    try{
        let { page } = req.query
        page -= 1;
    
        const options = {
            order: [
                ['id', 'ASC'],
            ],
            attributes: ['id', 'name', 'price', 'description', 'isActive', 'status', 'id_user', 'id_category'],
                    include: [
                        {
                            model: Product_image,
                            attributes: ['id', 'name', 'url_image', 'product_id']
                        }
                    ]
        }
    
        if (page) options.offset = page;
    
        const getDataProductAll = await Product.findAll(options)
    
        res.status(201).json(response.success(201, getDataProductAll))
    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500, 'Internal Server Error'))
    }
   
}

const dataProductById = async (req, res, next) => {
    try{
        const id_product = req.params.id

        const optionsNotId = {
            where: {
                id: id_product
            }
        }
    
        const idnull = await Product.findOne(optionsNotId)
    
        if (idnull === null){
            return res.status(400).json(response.error(400,`id ${id_product} Tidak Ditemukan`));
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

        res.status(201).json(response.success(201, getDataProducTById))


    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500), 'Internal Server Error')
    }
}

const createDataProduct = async (req, res, next) => {
    try{
        // deklarasi variabel yang telah dinputkan oleh user untuk database product
        const {name, price, description, isActive, status, id_user, id_category} = req.body

        const dataMyProductInsertDatabase = {
            name: name,
            price: price,
            description: description,
            isActive: isActive,
            status: status
            // id_user: id_user,
            // id_category: id_category
        }
    
        const createProduct = await Product.create(dataMyProductInsertDatabase)
        
        if (!createProduct) {
            return res.status(400).json(response.error(400,'Data Product Gagal dibuat'));
        }
        
        // untuk mendeklarasikan fungsi yang berada di cloudinary dengan async await 
        const uploader = async (path) => await cloudinary.uploadCloudinary(path)
        
        const dataMyProductImagesInsertDatabase = []

        const files = req.files;

        for(const file of files){
            // Mengambil lokasi file lalu mendeklarasikan ke variabel
            const {path} = file;
            // Mengambil name file lalu mendeklarasikan ke variabel
            const {originalname} = file;
            // memisahkan nama dan format gambar
            const nameImg = originalname.split('.')[0];
            // memanggil fungsi uploader
            const newpath = await uploader(path)
             // Mengambil url_gambar product lalu mendeklarasikan ke variabel
            const {secure_url} = newpath

            dataMyProductImagesInsertDatabase.push({
                name: nameImg,
                url_image: secure_url,
                product_id: createProduct.id
            })
        }

        const createImagesProduct = await Product_image.bulkCreate(dataMyProductImagesInsertDatabase)

        res.status(201).json(response.success(201,[createProduct,{Data_Images: createImagesProduct}]))


    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
}

const updateDataProduct = async (req, res, next) => {
    try{
        const id_product = req.params.id

        const optionsNotId = {
            where: {
                product_id: id_product
            }
        }
    
        const idnull = await Product_image.findOne(optionsNotId)
    
        if (idnull === null){
            return res.status(400).json(response.error(400,`id ${id_product} Tidak Ditemukan`));
        }  

        const {name, price, description, gambar, isActive, status, id_user, id_category} = req.body

        // const updateByProduct = await Product.update({
        //         name: name,
        //         price: price,
        //         description: description,
        //         isActive: isActive,
        //         status: status,
        //         // id_user: id_user,
        //         // id_category: id_category
        //     },{
        //         where: {
        //             id: id_product
        //         }
        //     }
        // )
        // if (updateByProduct === 0) {
        //     return res.status(401).json(response.success(201,'Data Product Gagal Di Perbarui'))
        // }



         // untuk mendeklarasikan fungsi yang berada di cloudinary dengan async await 
         const uploader = async (path) => await cloudinary.uploadCloudinary(path)
        
         const dataMyProductImagesUpdateDatabase = []
 
         const files = req.files;
 
         for(const file of files){
             // Mengambil lokasi file lalu mendeklarasikan ke variabel
             const {path} = file;
             // Mengambil name file lalu mendeklarasikan ke variabel
             const {originalname} = file;
             // memisahkan nama dan format gambar
             const nameImg = originalname.split('.')[0];
             // memanggil fungsi uploader
             const newpath = await uploader(path)
              // Mengambil url_gambar product lalu mendeklarasikan ke variabel
             const {secure_url} = newpath
 
             dataMyProductImagesUpdateDatabase.push({
                 name: nameImg,
                 url_image: secure_url
             })
         }

         const updataImagesProduct = await Product_image.update(dataMyProductImagesUpdateDatabase, {
              where: {
                 id: [41,42,43]
              }
          })
 
          if (updataImagesProduct === 0) {
             return res.status(401).json(response.error(401,'Data gambar Product gagal Di Perbarui'))
          }

 


        return res.status(201).json(response.success(201,'Data Product Berhasil Di Perbarui'))

    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
}


const deleteDataProductById = async (req, res, next) => {
    try{
        const id_Product = req.params.id

        const optionsNotId = {
            where: {
                product_id: id_Product
            }
        }
    
        const idnull = await Product_image.findOne(optionsNotId)
    
        if (idnull === null){
            return res.status(400).json(response.error(400,`id_product ${id_Product} Tidak Ditemukan`));
        }  

        const deleteProductImage = await Product_image.destroy({
            where: {
                product_id : [id_Product]
            }
        })

        if (deleteProductImage === 0) {
            return res.status(401).json(response.error(401, `Data Images Product dengan Product_id ${id_Product} Gagal Dihapus`))
        }


        const options = {
            where: {
                id: id_Product
            }
        }

        const deleteProduct = await Product.destroy(options)

        if (deleteProduct === 0) {
            return res.status(401).json(response.error(401, `Data Product dengan id ${id_Product} Gagal Dihapus`))
        }


        res.status(201).json(response.success(201, `Data Product dengan id ${id_Product} Berhasil Dihapus`))


    }catch(err){
        console.log(err)

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