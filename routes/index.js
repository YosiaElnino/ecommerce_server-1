const router = require('express').Router()
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const bannerRouter = require('./bannerRouter')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require('../middlewares/adminAuthorization')

router.post('/login', UserController.login)
router.use(authentication)
router.use(adminAuthorization)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)

module.exports = router