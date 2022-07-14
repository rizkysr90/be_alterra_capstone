const { Notification, Notification_types, Notification_object, Product, Order, User } = require('../models/')
const response = require('../utility/responseModel')

const getNotifikasiAll = async(req, res) => {
    try{   

        const dataUserFromJWT = req.user;

        const options = {
            where: {
                user_id: dataUserFromJWT.id
            },
            order: [
                ['id', 'DESC'],
            ],
            attributes: ['id', 'notification_object_id', 'user_id', 'status', 'createdAt'],
                include: [
                    {
                        model : Notification_object,
                        include: [
                            {
                                model: Notification_types,
                                attributes: {exclude: ['createdAt','updatedAt']},
                            },
                            {
                                model: Product
                            },
                            {
                                model: Order
                            }
                        ]
                        
                    }
                ]
        }
        
        const getDataNotifikasiAll = await Notification.findAll(options)

        return res.status(200).json(response.success(200, getDataNotifikasiAll))

        }catch(err){
            console.log(err)

            return res.status(500).json(response.error(500, 'Internal Server Error'))
        }
}

const getbyIdNotifikasi = async (req,res) => {
    try{

        const notifikasi_id = req.params.id
        const dataUserFromJWT = req.user;
        const {status} = req.body

        const options = { 
            where: {
                id: notifikasi_id
            },
        }

        const getDataNotifikasiAll = await Notification.findOne(options)

        if (!getDataNotifikasiAll) {
            return res.status(404).json(response.error(404, 'Notification Not Found'))
        }
    
        if(getDataNotifikasiAll.dataValues.user_id !== dataUserFromJWT.id){
            return res.status(404).json(response.error(404, 'Anda Tidak Memiliki Akses'))
        }
        
        await Notification.update(
            {
                status: status
            },options
        )


        return res.status(200).json(response.success(200, "Status Notifikasi Berhasil"))
       
    }catch(err){
        console.log(err)

        return res.status(500).json(response.error(500, 'Internal Server Error'))
    }
}

module.exports = {
    getNotifikasiAll,
    getbyIdNotifikasi
}