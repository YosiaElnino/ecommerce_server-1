'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Product_Category)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        notNull: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Price must be greater than 0'
        },
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        notNull: {
          args: true,
          msg: "Price is required"
        },
        isNumeric: {
          args: true,
          msg: "Please fill price with number"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Stock must be greater than 0'
        },
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        notNull: {
          args: true,
          msg: "Stock is required"
        },
        isNumeric: {
          args: true,
          msg: "Please fill stock with number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};