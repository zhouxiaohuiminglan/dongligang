const Router = require('koa-router')
const router = new Router()
const {getDocumentData} = require('../controller/document')
router.prefix('/document')
router.get('/data',getDocumentData)
module.exports = router