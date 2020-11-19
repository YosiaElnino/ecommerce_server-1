const { Cart } = require('../models')

async function cartAuthorization(req, res, next) {
  try {
    const id = req.params.id
    const cart = await Cart.findByPk(id)
    if (!cart) {
      throw { msg: 'Product not found', status: 404 }
    } else if (cart.UserId === req.loggedInUser.id) {
      next ()
    } else {
      throw { msg: 'Authorization failed', status: 401 }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = cartAuthorization