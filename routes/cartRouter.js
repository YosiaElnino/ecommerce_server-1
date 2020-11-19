const router = require('express').Router()
const CartController = require('../controllers/cartController')
const cartAuthorization = require('../middlewares/cartAuthorization')

router.get('/', CartController.read)
router.post('/', CartController.create)
router.patch('/:id', cartAuthorization, CartController.update)
router.delete('/:id', cartAuthorization, CartController.delete)

module.exports = router