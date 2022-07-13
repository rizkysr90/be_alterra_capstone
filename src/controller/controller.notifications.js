const { Notification, Notification_types, Notification_object, Product, Order } = require('../models')
const response = require('../utility/responseModel')

const getNotifikasiAll = async(req, res) => {
    try{   
        const options = {
            order: [
                ['id', 'ASC'],
            ],
            attributes: ['id', 'notification_type_id', 'product_id', 'order_id', 'createdAt'],
                // include: [
                //     {
                //         model : Notification,
                //         // attributes: ['id', 'name', 'description', 'table']
                //     },
                //     {
                //         model : Product,
                //         attributes: {exclude: ['description']}
                //     },
                //     {
                //         model : Order
                //     }
                // ]
        }

        const getDataNotifikasiAll = await Notification_object.findAll(options)
        res.status(200).json(response.success(200, getDataNotifikasiAll))

        }catch(err){
            console.log(err)

            res.status(500).json(response.error(500, 'Internal Server Error'))
        }
}

module.exports = {
    getNotifikasiAll
}