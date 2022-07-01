const response = require('./../utility/responseModel');
const {Product,Order} = require('./../models/');
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
    }
}