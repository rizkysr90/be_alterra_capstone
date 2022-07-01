const response = require('./../utility/responseModel');
const {Product,Order,City,Product_image,User,Category} = require('./../models/');
const pagination = require('./../utility/pagination');
module.exports = {
    async createOrder(req,res) {
        try {
            const {seller_id,buyer_id,price,product_id} = req.body;
            const dataUserFromJWT = req.user;

            if (price < 99) {
                return res.status(400).json(response.error(400,'Minimal harga penawaran adalah Rp99'))
            }
            if (buyer_id !== dataUserFromJWT.id) {
                // Verifikasi apakah user yang membeli produk === user yang login
                return res.status(401).json(response.error(401,'Anda tidak memiliki akses'))
            }
            const findProduct = await Product.findOne({where : {id : product_id}});
            if (!findProduct) {
                // Verifikasi apakah product yang dibeli ada didatabase
                return res.status(404).json(response.error(404,'Product tidak ditemukan'))
            }
            if (findProduct.id_user !== seller_id) {
                // Verifikasi apakah user yang menjual sama dengan yang mengupload produk
                return res.status(400).json(response.error(400,'Data produk dengan seller tidak sesuai'))
            }
            if (findProduct.id_user === buyer_id) {
                // Verifikasi apakah user yang membeli product sama dengan yang menjualnya
                return res.status(400).json(response.error(400,'Tidak boleh membeli barang sendiri'))
            }
            const isDuplicateOrder = await Order.findOne({
                where : {
                    buyer_id : req.body.buyer_id,
                    seller_id : req.body.seller_id,
                    product_id : req.body.product_id,
                    status : null
                }
            })
            if (isDuplicateOrder) {
                // Verifikasi apakah user melakukan duplikasi order dengan product yang sama
                return res.status(400).json(response.error(400,'ada order yang belum diproses dengan produk yang sama'))
            }

            await Order.create(req.body);
            return res.status(201).json(response.success(201,'Harga tawaranmu berhasil dikirim ke penjual'))
        } catch (error) {
            console.error(error)
            res.status(500).json(response.error(500,'Internal Server Error'));
        }
    },
    async getAllOrder(req,res) {
        try {
             // pagination memiliki 2 parameter,page dan row
            // page diambil dari query,row di set ke 12
            const {page,row} = pagination(req.query.page,12);
            // Mengambil data user id yang login dari JWT 
            const idUser = req.user.id;

            const options = {
                where : {
                    buyer_id : idUser
                },
                include : [
                    {
                        model : User,
                        as : 'Buyers',
                        attributes: {exclude: ['email','phone_number','password','updatedAt']},
                        include : [
                            {
                                model : City,
                                attributes: {exclude: ['createdAt','updatedAt']}
                            }
                        ]
                    },
                    {
                        model : Product,
                        attributes:{exclude : ['createdAt','updatedAt']},
                        include: [
                            {
                                model: Product_image,
                                attributes: ['id', 'name', 'url_image', 'product_id']
                            },
                            {
                                model : Category,
                            }
                        ],
                        
                    },
                    {
                        model : User,
                        as : 'Sellers',
                        attributes: {exclude: ['email','phone_number','password','updatedAt']},
                        include : [
                            {
                                model : City,
                                attributes: {exclude: ['createdAt','updatedAt']}
                            }
                        ]
                    },
                ],
                offset : page,
                limit : row
            }

            const findOrder = await Order.findAll(options);
            return res.status(200).json(response.success(200,findOrder));
        } catch (error) {
            console.log(error)
            return res.status(500).json(response.error(500,'Internal Server Error'))
        }
    },
    async getOrderById(req,res) {
        try {
            // Mengambil id order dari req.param 
            const orderId = req.params.order_id;
            // Mengambil id user dari JWT
            const idUser = req.user.id;

            const options = {
                where : {
                    // Convert it to number because the default is string
                    id : +orderId
                },
                include : [
                    {
                        model : User,
                        as : 'Buyers',
                        attributes: {exclude: ['email','phone_number','password','updatedAt']},
                        include : [
                            {
                                model : City,
                                attributes: {exclude: ['createdAt','updatedAt']}
                            }
                        ]
                    },
                    {
                        model : Product,
                        attributes:{exclude : ['createdAt','updatedAt']},
                        include: [
                            {
                                model: Product_image,
                                attributes: ['id', 'name', 'url_image', 'product_id']
                            },
                            {
                                model : Category,
                            }
                        ],
                        
                    },
                    {
                        model : User,
                        as : 'Sellers',
                        attributes: {exclude: ['email','phone_number','password','updatedAt']},
                        include : [
                            {
                                model : City,
                                attributes: {exclude: ['createdAt','updatedAt']}
                            }
                        ]
                    },
                ]
               
        }
        const findOrder = await Order.findOne(options);
        if (!findOrder) {
            // Cek apakah order dengan id x ditemukan
            return res.status(404).json(response.error(404,'order not found'))
        }
        if (findOrder.buyer_id !== idUser) {
            // Cek apakah order dengan id x adalah milik user yang login
            return res.status(401).json(response.error(401,'you dont have access'))
        }
        return res.status(200).json(response.success(200,findOrder));

        } catch (error) {
            console.error(error);
            return res.status(500).json(response.error(500,'Internal Server Error'))
        }
    }
    // async getOrderByProductId(req,res) {
    //     return res.status(200).json({'Hello' : 'HELLO'})
    // }
}