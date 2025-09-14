const Router = require('koa-router')
const router = new Router()
const {getMapList,addMap} = require('../controller/map')
router.prefix('/map')
router.get('/list',getMapList)
router.post('/add',addMap)
module.exports = router