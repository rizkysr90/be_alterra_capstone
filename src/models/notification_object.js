'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification_object extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   const foreignkeyNotifikasi_typeNotifikasi_object = {
    //     foreignkey: 'notification_type_id'
    //   }

    //   const foreignkeyProductNotifikasi_object = {
    //     foreignKey : 'product_id'
    //   }

    //   const foreignKeyOrderNotifikasi_object = {
    //     foreignKey : 'order_id'
    //   }
    //    // define association here
    //    const Notification_object = models.Notification_object;
    //    const Notification_type = models.Notification_types;
    //    const Product = models.Product;
    //    const Order = models.Order;

    //    Notification_type.hasMany(Notification_object, foreignkeyNotifikasi_typeNotifikasi_object);
    //    Notification_object.belongsTo(Notification_type, foreignkeyNotifikasi_typeNotifikasi_object);

    //    Product.hasMany(Notification_object, foreignkeyProductNotifikasi_object);
    //    Notification_object.belongsTo(Product, foreignkeyProductNotifikasi_object);

    //    Order.hasOne(Notification_object, foreignKeyOrderNotifikasi_object);
    //    Notification_object.belongsTo(Order, foreignKeyOrderNotifikasi_object)
    }
  }
  Notification_object.init({
    notification_type_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification_object',
  });
  return Notification_object;
};