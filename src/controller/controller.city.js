const {City} = require('./../models/');
const response = require('./../utility/responseModel');
const pagination = require('./../utility/pagination');
const { Op } = require('sequelize');

const getAllDataCities = async (req,res) => {
    try {
        // Membuat fitur pagination dengan data yang diambil dari url query dengan nama page
        // fungsi pagination mengembalikan,data page dan row yang akan digunakan untuk pengambilan di db
        // req.query.page adalah data yang diberikan di url untuk menentukan offset database
        const {page,row} = pagination(req.query.page)
        const dataCities = await City.findAll({
            attributes : {
                exclude : ['createdAt','updatedAt']
            },
            // Jadi kita akan mengambil row data sebanyak row yang sudah diberikan oleh pagination fungsi (row)
            limit : row,
            // Jadi kita akan mengambil row data dengan offset yang sudah diberikan oleh pagination fungsi (page)
            offset : page,
            // Jadi kita mengurutkan pengambilan data dari huruf A ke Z
            order : [['name','ASC']]
        })
        return res.status(200).json(response.success(200,dataCities));
    } catch (error) {
        console.error(error);
        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
  

}

const searchByName = async (req,res) => {
    try {
        // Membuat fitur pagination dengan data yang diambil dari url query dengan nama page
        // fungsi pagination mengembalikan,data page dan row yang akan digunakan untuk pengambilan di db
        // req.query.page adalah data yang diberikan di url untuk menentukan offset database
        const {page,row} = pagination(req.query.page)
        // Mengambil data query params yaitu name pada url yang menentukan data yang ingin dicari oleh user
        let {name} = req.query;
        // Convert data query params ke uppercase karna didatabase datanya berupa huruf besar semua
        name = name.toUpperCase();
        const dataCity = await City.findAll({
            where : {   
                "name" : {
                    // iLike adalah mirip seperti operator LIKE pada SQL namun case insensitif
                    [Op.iLike] : `%${name}%`
                } 
            },
            attributes : {
                exclude : ['createdAt','updatedAt']
            },
            // Jadi kita akan mengambil row data sebanyak row yang sudah diberikan oleh pagination fungsi (row)
            limit : row,
            // Jadi kita akan mengambil row data dengan offset yang sudah diberikan oleh pagination fungsi (page)
            offset : page,
            // Jadi kita mengurutkan pengambilan data dari huruf A ke Z
            order : [['name','ASC']]
        })
        return res.status(200).json(response.success(200,dataCity));
    } catch (error) {
        console.error(error);
        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
}

module.exports = {
    getAllDataCities,
    searchByName

}