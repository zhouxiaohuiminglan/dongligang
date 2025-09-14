const Router = require('koa-router')
const router = new Router()
const {getData,getData1,getData2} = require('../controller/chart')
router.prefix('/chart')
router.get('/data',getData)
router.get('/data1',getData1)
router.get('/data2',getData2)
module.exports = router