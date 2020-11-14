const router = require('express').Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.read)
router.post('/', ProductController.create)

router.get('/:id', ProductController.findOne)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

router.post('/:id/category', ProductController.addCategory)
router.delete('/:id/category', ProductController.deleteCategory)

module.exports = router