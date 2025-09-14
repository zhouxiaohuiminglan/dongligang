const Router = require('koa-router')
const router = new Router()
const {getMemberList,getRecordbyCardNo} = require('../controller/member')
router.prefix('/member')
router.post('/list',getMemberList)
router.post('/recordList',getRecordbyCardNo)
module.exports = router