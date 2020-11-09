const { User } = require('../models')

async function adminAuthorization(req, res, next) {
  try {
    const id = req.loggedInUser.id
    const user = await User.findByPk(id)
    if (user.role === 'admin') {
      next()
    } else {
      throw { msg: "Authorization failed, please login as admin", status: 401 }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = adminAuthorization