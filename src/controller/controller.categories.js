const { Category } = require('../models');
const response = require('../utility/responseModel');
const cloudinary = require('../utility/cloudinary');
const upload = require('../middleware/multerCategories');
const pagination = require('./../utility/pagination');

const getAllCategory = async (req, res) => {
  try {
    const { page, row } = pagination(req.query.page, 12);
    const options = {
      order: [['id', 'ASC']],
      attributes: ['id', 'name', 'image', 'isActive'],
      limit: row,
      offset: page,
    };

    const getAllCategory = await Category.findAll(options);

    if (!getAllCategory) {
      return res
        .status(404)
        .json(response.error(404, 'Category not found'));
    }
    res.status(200).json(response.success(200, getAllCategory));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(response.error(500, 'Internal Server Error'));
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id_category = req.params.id;

    const optionsNotId = {
      where: {
        id: id_category,
      },
    };

    const idnull = await Category.findOne(optionsNotId);

    if (idnull === null) {
      return res
        .status(401)
        .json(
          response.error(
            401,
            `Category dengan ID ${id_category} Tidak Ditemukan`
          )
        );
    }

    const options = {
      where: {
        id: id_category,
      },
      attributes: ['id', 'name', 'image', 'isActive'],
    };

    const getCategoryById = await Category.findOne(options);

    if (!getCategoryById) {
      res.status(404).json(response.error(404, 'Category not found'));
    }

    res.status(200).json(response.success(200, getCategoryById));
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json(response.error(500), 'Internal Server Error');
  }
};

const createCategory = async (req, res) => {
  try {
    const dataUserFromJWT = req.user.dataValues;
    for (let props in dataUserFromJWT) {
      if (dataUserFromJWT[props] === null) {
        const requiredData = [
          'phone_number',
          'address',
          'name',
          'city_id',
        ];
        if (requiredData.includes(props)) {
          return res
            .status(401)
            .json(
              response.error(
                401,
                'Anda tidak memiliki akses,lengkapi profile terlebih dahulu'
              )
            );
        }
      }
    }
    const { name, isActive, id_user, image } = req.body;

    const dataMyCategoryInsertDatabase = {
      name: name,
      image: image,
      isActive: isActive,
      id_user: id_user,
    };

    if (id_user !== dataUserFromJWT.id) {
      return res
        .status(401)
        .json(response.error(401, 'Anda tidak memiliki akses'));
    }

    const createCategory = await Category.create(
      dataMyCategoryInsertDatabase
    );

    if (!createCategory) {
      return res
        .status(404)
        .json(response.error(404, 'Data Category Gagal dibuat'));
    }

    const dataCategorySuccesCreate = await Category.findOne({
      where: {
        id: createCategory.id,
      },
      attributes: ['id', 'name', 'image', 'isActive'],
    });

    res
      .status(201)
      .json(response.success(201, dataCategorySuccesCreate));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(response.error(500, 'Internal Server Error'));
  }
};

const updateCategory = async (req, res) => {
  try {
    const dataUserFromJWT = req.user.dataValues;
    for (let props in dataUserFromJWT) {
      if (dataUserFromJWT[props] === null) {
        const requiredData = [
          'phone_number',
          'address',
          'name',
          // 'city_id',
        ];
        if (requiredData.includes(props)) {
          return res
            .status(401)
            .json(
              response.error(
                401,
                'Anda tidak memiliki akses, lengkapi profile terlebih dahulu'
              )
            );
        }
      }
    }

    const id_category = req.params.id;
    const { name, isActive, id_user, image } = req.body;

    const dataCategory = {
      name: name,
      image: image,
      isActive: isActive,
      id_user: id_user,
    };

    if (id_user !== dataUserFromJWT.id) {
      return res
        .status(401)
        .json(response.error(401, 'Anda tidak memiliki akses'));
    }

    const updateByCategory = await Category.update(dataCategory, {
      where: {
        id: id_category,
      },
    });

    res.status(201).json(response.success(201, dataCategory));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(response.error(500, 'Internal Server Error'));
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const dataUserFromJWT = req.user;
    const id_category = req.params.id;

    const optionsNotId = {
      where: {
        id: id_category,
      },
    };
    console.log(id_category);
    const idnull = await Category.findOne(optionsNotId);

    if (idnull === null) {
      return res
        .status(401)
        .json(
          response.error(
            401,
            `id_category ${id_category} Tidak Ditemukan`
          )
        );
    }

    if (idnull.id_user !== dataUserFromJWT.id) {
      return res
        .status(401)
        .json(response.error(401, 'Anda tidak memiliki akses'));
    }

    const options = {
      where: {
        id: [id_category],
      },
    };

    const deleteCategory = await Category.destroy(options);

    if (deleteCategory === 0) {
      return res
        .status(404)
        .json(
          response.error(
            404,
            `Data Category dengan id ${id_category} Gagal Dihapus`
          )
        );
    }
    res
      .status(200)
      .json(
        response.success(
          200,
          `Data Category dengan id ${id_category} Berhasil Dihapus`
        )
      );
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json(response.error(500, 'Internal Server Error'));
  }
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
};
