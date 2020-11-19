const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require('../middlewares/adminAuthorization')

router.get('/', CategoryController.read)

router.use(authentication)
router.use(adminAuthorization)
router.post('/', CategoryController.create)
router.delete('/:id', CategoryController.delete)

module.exports = router