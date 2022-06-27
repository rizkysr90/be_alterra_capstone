const { Product } = require('../models')
const { Product_image,User,Category } = require('../models');
const response = require('../utility/responseModel');
const pagination = require('./../utility/pagination');
const { Op } = require('sequelize');

const getProductAll = async (req, res) => {
    try{
        // Membuat Variabel page yang telah di inputkan user
        // 12 adalah row nya
        const {page,row} = pagination(req.query.page,12)
        // Mengikuti design yang ada di figma
        
        // opsi yang digunakakan untuk menampilkan user 
        const options = {
            where: {
                isActive: true,
                status: true
            },
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
                        },
                        {
                            model : User,
                            attributes: {exclude: ['phone_number','email','password','updatedAt']},
                        },
                        {
                            model : Category
                        }
                    ],
            // membuat pagination 
            limit: row,
            offset: page
            
        }
    
        // memangil semua data di tabel product dan foreign keynya 
        const getDataProductAll = await Product.findAll(options)

        if(getDataProductAll.length === 0 || !getDataProductAll){
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

const getProducByCategory = async(req, res) => {
    try{
        // Membuat Variabel page yang telah di inputkan user
        // 12 adalah row nya
        const {page,row} = pagination(req.query.page,12)
        // Mengikuti design yang ada di figma


        // mengambil id category yang dimasukan user lalu ditaru ke variabels
        const id_category = req.query.category

        // opsi mengecek data category sesuai id
        const optionsCategory = {
            where: {
                id: id_category
            }
        }

        // mengecek jika id category ditemukan atau tidak
        const nullCategory = await Category.findOne(optionsCategory)

        // error headling jika id category tidak ditemukan
        if (nullCategory === null) {
            return res.status(401).json(response.error(401,`id category ${id_category} Tidak Ditemukan`));
        }

        const opsiGetData = {
            where: {
                id: id_category,
            },
            // membuat agar yang di tampilkan hanya di dalam attribute
            attributes: {
                exclude: ['createdAt','updatedAt']
            },
                include: [
                    {
                        model: Product,
                        attributes: ['id', 'name', 'price', 'description', 'isActive', 'status', 'id_user', 'id_category'],
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
                ]
        }

        const getDataCategoryById = await Category.findOne(opsiGetData)

        if (!getDataCategoryById) {
            res.status(404).json(response.error(404, 'Product not found'))
        }
      
        // menampilkan response semua data jika berhasil
        res.status(200).json(response.success(200, getDataCategoryById))

    }catch(err){
        // menampilkan error di console log
        console.log(err)

        // menampilkan response semua data jika gagal
        return res.status(500).json(response.error(500), 'Internal Server Error')
    }
}

const getProducById = async (req, res) => {
    try{
        // mengambil id yang dimasukan user lalu ditaru ke variabels
        const id_product = req.params.id

        // opsi mengecek jika id yang dimasukan cocok dengan id di database produk
        const optionsNotId = {
            where: {
                id: id_product
            }
        }
    
        const idnull = await Product.findOne(optionsNotId)
    
        // error headling jika id tidak ditemukan
        if (idnull === null){
            return res.status(401).json(response.error(401,`id ${id_product} Tidak Ditemukan`));
        }  

        // opsi yang digunakakan untuk menampilkan product
        const options = {
            where: {
                id: id_product,
            },
            // membuat agar yang di tampilkan hanya di dalam attribute
            attributes: ['id', 'name', 'price', 'description', 'isActive', 'status', 'id_user', 'id_category'],
                    // menampilkan foreig key product image yang ber primary key di product
                    include: [
                        {
                            model: Product_image,
                            attributes: ['id', 'name', 'url_image', 'product_id']
                        },
                        {
                            model : User,
                            attributes: {exclude: ['phone_number','email','password','updatedAt']},
                        },
                        {
                            model : Category,
                        }
                    ]
        }

        // memangil satu data by id di tabel product dan foreign keynya
        const getDataProducTById = await Product.findOne(options)

        if (!getDataProducTById) {
            res.status(404).json(response.error(404, 'Product not found'))
        }

        // menampilkan response semua data jika berhasil
        res.status(200).json(response.success(200, getDataProducTById))


    }catch(err){
        // menampilkan error di console log
        console.log(err)

        // menampilkan response semua data jika gagal
        return res.status(500).json(response.error(500), 'Internal Server Error')
    }
}

const getProducBySerach = async (req, res) => {
    try{
        // Membuat Variabel page yang telah di inputkan user
        // 12 adalah row nya
        const {page,row} = pagination(req.query.page,12)
        // Mengikuti design yang ada di figma

        // menambkap input search dari user
        const name = req.query.search

        // opsi yang digunakakan untuk menampilkan product
        const options = {
            where: {
                "name": {
                    [Op.iLike]: `%${name}`,
                }
            },
            // membuat agar yang di tampilkan hanya di dalam attribute
            attributes: ['id', 'name', 'price', 'description', 'isActive', 'status', 'id_user', 'id_category'],
                    // menampilkan foreig key product image yang ber primary key di product
                    include: [
                        {
                            model: Product_image,
                            attributes: ['id', 'name', 'url_image', 'product_id']
                        },
                        {
                            model : User,
                            attributes: {exclude: ['phone_number','email','password','updatedAt']},
                        },
                        {
                            model : Category,
                        }
                    ],
            // membuat pagination 
            limit: row,
            offset: page
        }

        // memangil satu data by id di tabel product dan foreign keynya
        const getDataProducTByname = await Product.findOne(options)

        if (getDataProducTByname === null) {
            return res.status(401).json(response.error(401,`name ${name} Tidak Ditemukan`));
        }

        // menampilkan response semua data jika berhasil
        res.status(200).json(response.success(200, getDataProducTByname))

       
    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500), 'Internal Server Error')
    }
}



module.exports = {
    getProductAll,
    getProducByCategory,
    getProducById,
    getProducBySerach
}