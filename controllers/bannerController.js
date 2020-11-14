const { Banner } = require('../models')

class BannerController {
  static async create(req, res, next) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        status: req.body.status,
        type: req.body.type
      }
      const banner = await Banner.create(payload)
      res.status(201).json(banner)
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
      const banners = await Banner.findAll(option)
      res.status(200).json(banners)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req, res, next) {
    try {
      const banner = await Banner.findByPk(req.params.id)
      res.status(200).json(banner)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        status: req.body.status,
        type: req.body.type
      }
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const edited = await Banner.update(payload, option)
      res.status(200).json(edited[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async activate(req, res, next) {
    try {
      const payload = {
        status: req.body.status
      }
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const edited = await Banner.update(payload, option)
      res.status(200).json(edited[1][0])
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
      const deleted = await Banner.destroy(option)
      res.status(200).json({
        msg: "Banner has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BannerController