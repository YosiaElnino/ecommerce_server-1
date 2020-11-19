const router = require('express').Router()
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const bannerRouter = require('./bannerRouter')
const cartRouter = require('./cartRouter')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)

router.use(authentication)
router.use('/carts', cartRouter)

module.exports = router