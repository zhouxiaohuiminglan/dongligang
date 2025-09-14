const Router = require('koa-router')
const router = new Router()
const {doLogin,doLoginOut} = require('../controller/user')
router.prefix('/user')
router.post('/login',doLogin)
router.get('/loginOut',doLoginOut)
module.exports = router