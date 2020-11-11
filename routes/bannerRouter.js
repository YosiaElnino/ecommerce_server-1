const router = require('express').Router()
const BannerController = require('../controllers/bannerController')

router.get('/', BannerController.read)
router.post('/', BannerController.create)

router.put('/:id', BannerController.update)
router.delete('/:id', BannerController.delete)

module.exports = router