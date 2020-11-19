const { Cart, Product } = require('../models')
const { Op } = require("sequelize")

class CartController {
  static async create (req, res, next) {
    try {
      const option = {
        where: {
          [Op.and]: [{ UserId: req.loggedInUser.id }, { ProductId: req.body.ProductId }]
        },
        include: [Product]
      }
      const product = await Cart.findOne(option)
      if (product) {
        let payload = {
          amount: 0
        }
        const totalAmount = product.amount + req.body.amount
        if (totalAmount > product.Product.stock) {
          payload.amount = product.Product.stock
        } else {
          payload.amount = totalAmount
        }
        const updatedCart = await Cart.update(payload, option)
        res.status(200).json({
          msg: 'Cart has been updated'
        })
      } else {
        let payload = {
          UserId: req.loggedInUser.id,
          ProductId: req.body.ProductId,
          amount: req.body.amount
        }
        const thisProduct = await Product.findByPk(req.body.ProductId)
        if (req.body.amount > thisProduct.stock) {
          payload.amount = thisProduct.stock
        }
        const cart = await Cart.create(payload)
        res.status(201).json(cart)
      }
    } catch (error) {
      next(error)
    }
  }

  static async read (req, res, next) {
    try {
      const option = {
        where: {
          UserId: req.loggedInUser.id
        },
        include: [Product]
      }
      const carts = await Cart.findAll(option)
      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const option = {
        where: {
          id: req.params.id
        }
      }
      let payload = {
        amount: req.body.amount
      }
      const product = await Product.findByPk(req.body.ProductId)
      if (payload.amount > product.stock) {
        payload.amount = product.stock
      }
      const updatedCart = await Cart.update(payload, option)
      res.status(200).json({
        msg: 'Cart has been updated'
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const option = {
        where: {
          id: req.params.id
        }
      }
      const deletedCart = await Cart.destroy(option)
      res.status(200).json({
        msg: 'Cart has been deleted.'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController