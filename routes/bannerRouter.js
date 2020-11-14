const router = require('express').Router()
const BannerController = require('../controllers/bannerController')

router.get('/', BannerController.read)
router.post('/', BannerController.create)

router.get('/:id', BannerController.findOne)
router.put('/:id', BannerController.update)
router.patch('/:id', BannerController.activate)
router.delete('/:id', BannerController.delete)

module.exports = router