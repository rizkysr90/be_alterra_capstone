const response = require('./../utility/responseModel');
const getAllOrder = async (req,res) => {
    try {
        return res.status(200).json(response.success(200,'Work In Progress'));
    } catch (error) {
        console.error(error);
        return res.status(500).json(response.error(500,'Internal Server Error'));
    }
}

module.exports = {
    getAllOrder
}