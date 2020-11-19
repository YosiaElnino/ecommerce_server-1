const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require('../middlewares/adminAuthorization')


router.get('/', ProductController.read)
router.get('/:id', ProductController.findOne)

router.use(authentication)
router.use(adminAuthorization)
router.post('/', ProductController.create)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)
router.post('/:id/category', ProductController.addCategory)
router.delete('/:id/category', ProductController.deleteCategory)

module.exports = router