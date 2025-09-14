const Router = require('koa-router')
const router = new Router()
const {getAlarmList,setAlarmInfo} = require('../controller/alarm')
router.prefix('/alarm')
router.get('/list',getAlarmList)
router.post('/setAlarmInfo',setAlarmInfo)
module.exports = router