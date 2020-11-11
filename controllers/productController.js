const { Product, Product_Category, Category } = require('../models')
const { Op } = require("sequelize");

class ProductController {
  static async create(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const product = await Product.create(payload)
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async read(req, res, next) {
    try {
      let data;
      if (req.query.category) {
        const option = {
          where: {
            CategoryId: req.query.category
          },
          include: [{
            model: Product,
            include: [{
              model: Product_Category,
              include: [Category]
            }]
          }]
        }
        const allData = await Product_Category.findAll(option)
        data = allData.map(el => {
          return el.Product
        })
      } else if (req.query.search) {
        const option = {
          where: {
            name: {
              [Op.substring]: req.query.search
            }
          },
          include: [{
            model: Product_Category,
            include: [Category]
          }]
        }
        data = await Product.findAll(option)
      } else {
        const option = {
          include: [{
            model: Product_Category,
            include: [Category]
          }]
        }
        data = await Product.findAll(option) 
      }
      const products = data.map(product => {
        const { id, name, description, image_url, price, stock, createdAt, updatedAt, Product_Categories } = product
        const categories = Product_Categories.map(el => {
          return el.Category
        })
        const product_data = {
          id, name, description, image_url, price, stock, createdAt, updatedAt, categories
        }
        return product_data
      })
      res.status(200).json(products)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      }
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const updated = await Product.update(payload, option)
      res.status(200).json(updated[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const option = {
        where: {
          id: req.params.id
        }
      }
      const deleted = await Product.destroy(option)
      res.status(200).json({
        msg: "Product has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const id = req.params.id
      const product = await Product.findByPk(id)
      res.status(200).json(product)
    } catch (err) {
      next(error)
    }
  }

  static async addCategory(req, res, next) {
    try {
      const categories = req.body.categories
      const data = categories.map(el => {
        const eachData = {
          ProductId: req.params.id,
          CategoryId: el
        }
        return eachData
      })
      const category = await Product_Category.bulkCreate(data)
      res.status(201).json(category)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = ProductController