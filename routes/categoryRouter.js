const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.post('/', CategoryController.create)
router.delete('/:id', CategoryController.delete)

module.exports = router