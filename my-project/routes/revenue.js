const Router = require('koa-router')
const router = new Router()
const {getSale,getRevenueList} = require('../controller/revenue')
router.prefix('/revenue')
router.get('/sale',getSale)
router.post('/list',getRevenueList)
module.exports = router