const router = require('express').Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.read)
router.post('/', ProductController.create)

router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

router.post('/:id/addCategory', ProductController.addCategory)

module.exports = router