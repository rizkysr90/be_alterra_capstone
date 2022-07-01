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
            const idUser = req.user.id;

            const options = {
                where : {
                    buyer_id : idUser
                },
                include : [
                    {
                        model : User,
                        attributes: {exclude: ['password','updatedAt']},
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
                        attributes: {exclude: ['password','updatedAt']},
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
            res.status(500).json(response.error(500,'Internal Server Error'))
        }
       
        
    }
}