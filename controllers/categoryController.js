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

    }
  }
}

module.exports = CategoryController