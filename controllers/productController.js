const { Product } = require('../models')

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
      const products = await Product.findAll()
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
}

module.exports = ProductController