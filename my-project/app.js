const Koa = require('koa')

const app = new Koa()

const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')

const {port} = require('./config')
const user = require('./routes/user')
const chart = require('./routes/chart')
const station = require('./routes/station')
const revenue = require('./routes/revenue')
const map = require('./routes/map')
const orders = require('./routes/orders')
const alarm = require('./routes/alarm')
const member = require('./routes/member')
const document = require('./routes/document')
const permission = require('./routes/permission')
const {checkLogin} = require('./middleware')

const curPort = process.env.PORT || port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'njk': 'nunjucks'},
    extension: 'njk'
  }))
  .use(user.routes(),user.allowedMethods())
  .use(chart.routes(),chart.allowedMethods())
  .use(station.routes(),station.allowedMethods())
  .use(revenue.routes(),revenue.allowedMethods())
  .use(map.routes(),map.allowedMethods())
  .use(orders.routes(),orders.allowedMethods())
  .use(alarm.routes(),alarm.allowedMethods())
  .use(member.routes(),member.allowedMethods())
  .use(document.routes(),document.allowedMethods())
  .use(permission.routes(),permission.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})
app.context.blackTokenList = []
app.context.success = function(message,data){
  this.body = {
    code:200,
    message,
    data
  }
}
app.context.failed = function(message,data){
  this.body = {
    code:102,
    message,
    data
  }
}
app.context.tokenExpries = function(message,data){
  this.body = {
    code:603,
    message,
    data
  }
}
app.use(checkLogin)
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})
//通过重写Date.prototype.toJSON方法，强制返回本地时区格式化字符串：
Date.prototype.toJSON = function() {
  return this.toLocaleString('zh-CN', { 
    timeZone: 'Asia/Shanghai',
    hour12: false 
  }).replace(/\//g, '-');
};

module.exports = app.listen(curPort, () => {
  console.log(`Listening on http://localhost:${curPort}`)
})
