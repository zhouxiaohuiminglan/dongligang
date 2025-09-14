const Router = require('koa-router')
const router = new Router()
const {getOrdersList,deleteOrders,getCityList} = require('../controller/orders')
router.prefix('/orders')
router.post('/list',getOrdersList)
router.post('/delete',deleteOrders)
router.get('/cityList',getCityList)
module.exports = router