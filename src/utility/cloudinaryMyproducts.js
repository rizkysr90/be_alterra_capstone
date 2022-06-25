const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({ 
    cloud_name: `${process.env.CLOUDINARY_NAME}`, 
    api_key: `${process.env.CLOUDINARY_API_KEY}`, 
    api_secret: `${process.env.CLOUDINARY_API_SECRET}` 
  });

 const uploadCloudinary = async (file) => {
    const uploadResult = await cloudinary.v2.uploader.upload(file, {
        resource_type: "image",
        folder: `Secondhand_app/Product/image/`
    })

    return uploadResult

}

const deleteCloudinary = async (file) => {
    const deleteResult = await cloudinary.v2.uploader.destroy(file, {
        resource_type: "image",
        folder: `Secondhand_app/Product/image/`
    })

    return deleteResult
}

module.exports = {
    uploadCloudinary,
    deleteCloudinary
}