const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require('../middlewares/adminAuthorization')

router.get('/', BannerController.read)

router.use(authentication)
router.use(adminAuthorization)
router.post('/', BannerController.create)
router.get('/:id', BannerController.findOne)
router.put('/:id', BannerController.update)
router.patch('/:id', BannerController.activate)
router.delete('/:id', BannerController.delete)

module.exports = router