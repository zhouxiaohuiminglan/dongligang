const Router = require('koa-router')
const router = new Router()
const {getPermissionList,getUserAuth,setUserAuth,deleteUserAuth} = require('../controller/permission')
router.prefix('/permission')
router.post('/list',getPermissionList)
router.post('/userAuth',getUserAuth)
router.post('/setAuth',setUserAuth)
router.post('/deleteAuth',deleteUserAuth)
module.exports = router