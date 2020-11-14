const { Category } = require('../models')

class CategoryController {
  static async create(req, res, next) {
    try {
      const payload = {
        name: req.body.name
      }
      const category = await Category.create(payload)
      res.status(201).json(category)
    } catch (error) {
      next(error)
    }
  }

  static async read(req, res, next) {
    try {
      const option = {
        order: [
          ['updatedAt', 'DESC']
        ]
      }
      const categories = await Category.findAll(option)
      res.status(200).json(categories)
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
      const deleted = await Category.destroy(option)
      res.status(200).json({
        msg: "Category has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController