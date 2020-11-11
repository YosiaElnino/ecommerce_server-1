const { Product, Product_Category, Category } = require('../models')

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
      const option = {
        include: [{
          model: Product_Category,
          include: [Category]
        }]
      }
      const data = await Product.findAll(option)
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

  static async addCategory(req, res, next) {
    try {
      const payload = {
        ProductId: req.params.id,
        CategoryId: req.body.CategoryId
      }
      const category = await Product_Category.create(payload)
      res.status(201).json(category)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController