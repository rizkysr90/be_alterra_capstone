const response = require('./../utility/responseModel');
const pagination =require('./../utility/pagination');
const {Order,City,User,Product,Product_image,Category} = require('./../models/');

const getAllOrder = async (req,res) => {
    try {
        const {page,row} = pagination(req.query.page,12);
        let statusOrder = req.query.status;
        const dataUser = req.user;
        if (!statusOrder || isNaN(statusOrder)) {
            // statusOrder null = sedang diproses
            // statusOrder 1 = terjual
            // statusOrder 0 = dibatalkan
            statusOrder = null
        }
        const options = {
            where : {
                seller_id : dataUser.id,
                status : statusOrder
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

        const findSales =  await Order.findAll(options);
        return res.status(200).json(response.success(200,findSales));
    } catch (error) {
        console.error(error);
        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
}

const getByIdOrder = async (req,res) => {
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
    if (findOrder.seller_id !== idUser) {
        // Cek apakah order yang masuk dengan id x adalah milik user yang login sebagai penjual
        return res.status(401).json(response.error(401,'you dont have access'))
    }
    return res.status(200).json(response.success(200,findOrder));

    } catch (error) {
        console.error(error);
        return res.status(500).json(response.error(500,'Internal Server Error'))
    }

}

module.exports = {
    getAllOrder,
    getByIdOrder
}